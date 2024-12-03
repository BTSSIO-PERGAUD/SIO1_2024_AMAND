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
import toString from "isto/to/string";
import isAbsolute from "path/isAbsolute";
import separator from "path/utils/separator.esm.js";
import toFileUrl from "path/toFileUrl";
import fromFileUrl from "path/fromFileUrl";
/**
 * @module path/resolve
 * @name path/resolve
 * @description Resolve relative path.
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function resolve
 * @param {String | URL} path A path compatible with appendix D of the RFC8089 standard.
 * 
 * https://datatracker.ietf.org/doc/html/rfc8089#appendix-D
 * @returns {String}
 * @example
 * // ECMAScript
 * import resolve from "path/resolve";
 * // CommonJS
 * const resolve = require("path/resolve");
 * // Declarations
 * // posix
 * resolve("", "") // Return ""
 * resolve("", "") // Return ""
 * // win32
 * resolve("", "") // Return ""
 * resolve("", "") // Return ""
 */
export default function resolve (path) {
    try {
        path = toString(fromFileUrl(path), {
            default: false
        }) || toString(path, {
            default: false
        });
        return (isAbsolute(path) != true ? fromFileUrl(new URL(path, toFileUrl(`${Deno.cwd()}${separator}`))) : path)
    } catch (error) {
        return ""
    }
}