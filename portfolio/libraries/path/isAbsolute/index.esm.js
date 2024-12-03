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
import isWindows from "path/utils/isWindows.esm.js";
import isWindowsDeviceRoot from "path/utils/isWindowsDeviceRoot.esm.js";
import isPathSeparator from "path/utils/isPathSeparator.esm.js";
import {
    CHAR_COLON
} from "path/utils/constants.esm.js";
/**
 * @module path/isAbsolute
 * @name path/isAbsolute
 * @description A custom fork of https://deno.land/std@0.219.0/path/is_absolute.ts?s=isAbsolute
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isAbsolute
 * @param {String | URL} path https://deno.land/std@0.219.0/path/is_absolute.ts?s=isAbsolute#function_isAbsolute_0_parameters_path
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isAbsolute from "path/isAbsolute";
 * // CommonJS
 * const isAbsolute = require("path/isAbsolute");
 * // Declarations
 * // posix
 * isAbsolute("") // Return true
 * isAbsolute("") // Return false
 * // win32
 * isAbsolute("") // Return true
 * isAbsolute("") // Return false
 */
export default function isAbsolute (path) {
    path = toString(fromFileUrl(path), {
        default: false
    }) || toString(path);
    const length = path.length;
    if (isWindows == true) {
        if (length > 0) {
            const code = path.charCodeAt(0);
            return (isWindowsDeviceRoot(code) == true ? (length > 2 && path.charCodeAt(1) == CHAR_COLON ? isPathSeparator(path.charCodeAt(2)) == true : false) : isPathSeparator(code) == true)
        } else return false
    } else return (length > 0 && isPathSeparator(path.charCodeAt(0)) == true)
}