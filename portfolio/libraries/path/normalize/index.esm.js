/*MIT License

Copyright 2018-2024 the Deno authors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/
import fromFileUrl from "path/fromFileUrl";
import toString from "isto/to/string";
import isPathSeparator from "path/utils/isPathSeparator.esm.js";
import separator from "path/utils/separator.esm.js";
import isWindows from "path/utils/isWindows.esm.js";
import isWindowsDeviceRoot from "path/utils/isWindowsDeviceRoot.esm.js";
import {
    CHAR_COLON
} from "path/utils/constants.esm.js";
const CHAR_DOT = 46, CHAR_FORWARD_SLASH = 47;
function normalizeString (path, allowAboveRoot) {
    let result = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, code;
    for (let index = 0, length = path.length; index <= length; ++index) {
        if (index < length) code = path.charCodeAt(index)
        else if (isPathSeparator(code) == true) break
        else code = CHAR_FORWARD_SLASH
        if (isPathSeparator(code) == true) {
            if (lastSlash == (index - 1) || dots == 1) {
                // NOOP
            } else if (lastSlash != (index - 1) && dots == 2) {
                if (result.length < 2 || lastSegmentLength != 2 || result.charCodeAt(result.length - 1) != CHAR_DOT || result.charCodeAt(result.length - 2) != CHAR_DOT) {
                    if (result.length > 2) {
                        const lastSlashIndex = result.lastIndexOf(separator);
                        if (lastSlashIndex == -1) {
                            result = "";
                            lastSegmentLength = 0;
                        } else {
                            result = result.slice(0, lastSlashIndex);
                            lastSegmentLength = (result.length - 1) - result.lastIndexOf(separator);
                        };
                        lastSlash = index;
                        dots = 0;
                        continue
                    } else if (result.length == 2 || result.length == 1) {
                        result = "";
                        lastSegmentLength = 0;
                        lastSlash = index;
                        dots = 0;
                        continue
                    }
                };
                if (allowAboveRoot == true) {
                    result = result.length > 0 ? result + `${separator}..` : "..";
                    lastSegmentLength = 2
                }
            } else {
                result = result.length > 0 ? result + (separator + path.slice(lastSlash + 1, index)) : path.slice(lastSlash + 1, index);
                lastSegmentLength = (index - lastSlash) - 1
            };
            lastSlash = index;
            dots = 0
        } else dots = code == CHAR_DOT && dots != -1 ? dots + 1 : -1
    };
    return result
};
/**
 * @module path/join
 * @name path/join
 * @description A custom fork of https://deno.land/std@0.219.0/path/normalize.ts?s=normalize
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function join
 * @param {String | URL} path https://deno.land/std@0.219.0/path/normalize.ts?s=normalize#function_normalize_0_parameters_path
 * @returns {String}
 * @example
 * // ECMAScript
 * import join from "path/join";
 * // CommonJS
 * const join = require("path/join");
 * // Declarations
 * // posix
 * join("") // Return ""
 * join("") // Return ""
 * // win32
 * join("") // Return ""
 * join("") // Return ""
 */
export default function normalize (path) {
    path = (toString(fromFileUrl(path), {
        default: false
    }) || toString(path, {
        default: false
    })) || ".";
    if (isWindows == true) {
        const length = path.length, code = path.charCodeAt(0);
        let rootEnd = 0, device, isAbsolute = false;
        if (length > 1) {
            if (isPathSeparator(code) == true) {
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1)) == true) {
                    let j = 2, last = j;
                    for (; j < length; ++j) {
                        if (isPathSeparator(path.charCodeAt(j)) == true) break
                    };
                    if (j < length && j != last) {
                        const firstPart = path.slice(last, j);
                        last = j;
                        for (; j < length; ++j) {
                            if (!isPathSeparator(path.charCodeAt(j))) break
                        };
                        if (j < length && j != last) {
                            last = j;
                            for (; j < length; ++j) {
                                if (isPathSeparator(path.charCodeAt(j)) == true) break
                            };
                            if (j == length) return `\\\\${firstPart}\\${path.slice(last)}\\`
                            else if (j != last) {
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j
                            }
                        }
                    }
                } else rootEnd = 1
            } else if (isWindowsDeviceRoot(code) == true) {
                if (path.charCodeAt(1) == CHAR_COLON) {
                    device = path.slice(0, 2);
                    rootEnd = 2;
                    if (length > 2 && isPathSeparator(path.charCodeAt(2)) == true) {
                        isAbsolute = true;
                        rootEnd = 3
                    }
                }
            }
        } else if (isPathSeparator(code) == true) return "\\"
        let tail = (rootEnd < length ? normalizeString(path.slice(rootEnd), !isAbsolute) : "");
        if (tail.length == 0 && !isAbsolute) tail = ".";
        if (tail.length > 0 && isPathSeparator(path.charCodeAt(length - 1)) == true) tail += "\\";
        return (typeof (device) == "undefined" ? (isAbsolute == true ? (tail.length > 0 ? `\\${tail}` : "\\") : (tail.length > 0 ? tail : "")) : (isAbsolute == true ? (tail.length > 0 ? `${device}\\${tail}` : `${device}\\`) : (tail.length > 0 ? device + tail : device)))
    } else {
        const isAbsolute = isPathSeparator(path.charCodeAt(0)), trailingSeparator = isPathSeparator(path.charCodeAt(path.length - 1));
        path = normalizeString(path, !isAbsolute);
        if (path.length == 0 && !isAbsolute) path = "."
        if (path.length > 0 && trailingSeparator == true) path += "/"
        return (isAbsolute == true ? `/${path}` : path)
    }
}