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
import isWindows from "path/utils/isWindows.esm.js";
/**
 * @module path/fromFileUrl
 * @name path/fromFileUrl
 * @description A custom fork of https://deno.land/std@0.219.0/path/from_file_url.ts?s=fromFileUrl
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function fromFileUrl
 * @param {String | URL} url https://deno.land/std@0.219.0/path/from_file_url.ts?s=fromFileUrl#function_fromFileUrl_0_parameters_url
 * @returns {String}
 * @example
 * // ECMAScript
 * import fromFileUrl from "path/fromFileUrl";
 * // CommonJS
 * const fromFileUrl = require("path/fromFileUrl");
 * // Declarations
 * // posix
 * fromFileUrl("file:///home/foo") // "/home/foo"
 * // win32
 * fromFileUrl("file:///home/foo") // Return "\\home\\foo"
 * fromFileUrl("file:///C:/Users/foo") // Return "C:\\Users\\foo"
 * fromFileUrl("file://localhost/home/foo") // Return "\\\\localhost\\home\\foo"
 */
export default function fromFileUrl (url) {
    if ((url = (function () {
        try {
            return new URL(url)
        } catch (error) {
            return undefined
        }
    })())?.protocol == "file:") {
        if (isWindows == true) {
            const path = decodeURIComponent(url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
            return (url.hostname != "" ? `\\\\${url.hostname}${path}` : path)
        } else return decodeURIComponent(url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"))
    } else return ""
}