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
import resolve from "path/resolve";
import isPathSeparator from "path/utils/isPathSeparator.esm.js";
import isWindows from "path/utils/isWindows.esm.js";
import separator from "path/utils/separator.esm.js";
const CHAR_BACKWARD_SLASH = 92;
function check (value) {
    if (isWindows == true) return value == CHAR_BACKWARD_SLASH
    else return isPathSeparator(value) == true
};
/**
 * @module path/relative
 * @name path/relative
 * @description A custom fork of https://jsr.io/@std/path@0.225.2/doc/~/relative
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function relative
 * @param {String | URL} from https://jsr.io/@std/path@0.225.2/doc/~/relative#function_relative_0_parameters_to
 * @param {String | URL} to https://jsr.io/@std/path@0.225.2/doc/~/relative#function_relative_0_parameters_to
 * @returns {String}
 * @example
 * // ECMAScript
 * import relative from "path/relative";
 * // CommonJS
 * const relative = require("path/relative");
 * // Declarations
 * // posix
 * relative("", "") // Return ""
 * relative("", "") // Return ""
 * // win32
 * relative("", "") // Return ""
 * relative("", "") // Return ""
 */
export default function relative (from, to) {
    from = toString(fromFileUrl(from), {
        default: false
    }) || toString(from), to = toString(fromFileUrl(to), {
        default: false
    }) || toString(to);
    if (from != to) {
        from = resolve(from);
        const toOrig = resolve(to);
        if (isWindows == true) from = from.toLowerCase(), to = toOrig.toLowerCase()
        let fromStart = (isWindows == true ? 0 : 1), fromEnd = from.length;
        for (; fromStart < fromEnd; ++fromStart) {
            if (check(from.charCodeAt(fromStart)) != true) break
        };
        if (isWindows == true) {
            for (; (fromEnd - 1) > fromStart; --fromEnd) {
                if (check(from.charCodeAt((fromEnd - 1))) != true) break
            }
        };
        const fromLen = (fromEnd - fromStart);
        let toStart = (isWindows == true ? 0 : 1), toEnd = to.length;
        for (; toStart < toEnd; ++toStart) {
            if (check(to.charCodeAt(toStart)) != true) break
        };
        if (isWindows == true) {
            for (; (toEnd - 1) > toStart; --toEnd) {
                if (check(to.charCodeAt((toEnd - 1))) != true) break
            }
        };
        const toLen = (toEnd - toStart), length = (fromLen < toLen ? fromLen : toLen);
        let lastCommonSep = -1, i = 0;
        for (; i <= length; ++i) {
            if (i == length) {
                if (toLen > length) {
                    if (check(to.charCodeAt(toStart + i)) == true) return (isWindows == true ? toOrig : to).slice(toStart + i + 1)
                    else if (i == (isWindows == true ? 2 : 0)) return (isWindows == true ? toOrig : to).slice(toStart + i)
                };
                if (fromLen > length) {
                    if (check(from.charCodeAt(fromStart + i)) == true) lastCommonSep = i
                    else if (i == (isWindows == true ? 2 : 0)) lastCommonSep = (isWindows == true ? 3 : 0)
                };
                break
            };
            const fromCode = from.charCodeAt(fromStart + i);
            const toCode = to.charCodeAt(toStart + i);
            if (fromCode != toCode) break
            else if (check(fromCode) == true) lastCommonSep = i
        };
        if (isWindows == true) {
            if (i != length && lastCommonSep == -1) return toOrig
        } else if (lastCommonSep == -1) lastCommonSep = 0
        let out = "";
        for (i = (fromStart + lastCommonSep + 1); i <= fromEnd; ++i) {
            if (i == fromEnd || check(from.charCodeAt(i)) == true) {
                if (out.length == 0) out += "..";
                else out += `${separator}..`;
            }
        };
        if (out.length > 0) return (out + (isWindows == true ? toOrig : to).slice(toStart + lastCommonSep, (isWindows == true ? toEnd : undefined)))
        else {
            toStart += lastCommonSep;
            if (check((isWindows == true ? toOrig : to).charCodeAt(toStart)) == true) ++toStart
            return (isWindows == true ? toOrig : to).slice(toStart)
        }
    } else return ""
}