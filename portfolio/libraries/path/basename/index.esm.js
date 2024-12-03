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
import isWindows from "path/utils/isWindows.esm.js";
import isWindowsDeviceRoot from "path/utils/isWindowsDeviceRoot.esm.js";
import {
    CHAR_COLON
} from "path/utils/constants.esm.js";
function lastPathSegment (path, start) {
    const length = path.length;
    let matchedNonSeparator = false, end = length;
    for (let i = (length - 1); i >= start; --i) {
        if (isPathSeparator(path.charCodeAt(i)) == true) {
            if (matchedNonSeparator == true) {
                start = (i + 1);
                break
            }
        } else if (matchedNonSeparator != true) {
            matchedNonSeparator = true;
            end = (i + 1)
        }
    };
    return path.slice(start, end)
};
function stripTrailingSeparators (segment) {
    const length = segment.length;
    if (length > 1) {
        let end = length;
        for (let i = (length - 1); i > 0; i--) {
            if (isPathSeparator(segment.charCodeAt(i)) == true) end = i
            else break 
        };
        return segment.slice(0, end)
    } else return segment
};
function stripSuffix (name, suffix) {
    const suffixLength = suffix.length, nameLength = name.length;
    if (suffixLength < nameLength) {
        const lenDiff = (nameLength - suffixLength);
        for (let i = (suffixLength - 1); i >= 0; --i) {
            if (name.charCodeAt(lenDiff + i) != suffix.charCodeAt(i)) return name
        };
        return name.slice(0, -suffixLength);
    } else return name
};
/**
 * @module path/basename
 * @name path/basename
 * @description A custom fork of https://jsr.io/@std/path@0.225.2/doc/~/basename
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function basename
 * @param {String | URL} path https://jsr.io/@std/path@0.225.2/doc/~/basename#function_basename_0_parameters_path
 * @param {String} [suffix] https://jsr.io/@std/path@0.225.2/doc/~/basename#function_basename_0_parameters_suffix
 * @returns {String}
 * @example
 * // ECMAScript
 * import basename from "path/basename";
 * // CommonJS
 * const basename = require("path/basename");
 * // Declarations
 * basename("./hello.world") // "hello.world"
 * basename("C:\\user\\hello.world") // "hello.world"
 * basename("/home/user/hello.world") // Return "hello.world"
 */
export default function basename (path, suffix) {
    path = toString(fromFileUrl(path), {
        default: false
    }) || toString(path);
    const length = path.length;
    if (length > 0) {
        suffix = toString(suffix);
        let start = 0;
        if (isWindows == true) {
            if (path.length >= 2) {
                if (isWindowsDeviceRoot(path.charCodeAt(0)) == true) {
                    if (path.charCodeAt(1) == CHAR_COLON) start = 2
                }
            }
        };
        const strippedSegment = stripTrailingSeparators(lastPathSegment(path, start));
        return (suffix.length > 0 ? stripSuffix(strippedSegment, suffix) : strippedSegment)
    } else return ""
}