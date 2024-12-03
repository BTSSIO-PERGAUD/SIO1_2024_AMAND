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
import isWindows from "path/utils/isWindows.esm.js";
import isString from "isto/is/string";
const WHITESPACE_ENCODINGS = {
    "\u0009": "%09",
    "\u000A": "%0A",
    "\u000B": "%0B",
    "\u000C": "%0C",
    "\u000D": "%0D",
    "\u0020": "%20"
}, ENCODE_WHITESPACE_REGEX = /[\s]/g, TO_FILE_URL_WINDOWS_REGEX = /^(?:[/\\]{2}([^/\\]+)(?=[/\\](?:[^/\\]|$)))?(.*)/, TO_FILE_URL_REPLACE_PERCENTAGE_REGEX = /%/g, TO_FILE_URL_REPLACE_SLASH_REGEX = /\\/g;
function encodeWhitespace (string) {
    return (toString(string)).replace(ENCODE_WHITESPACE_REGEX, function (char) {
        return WHITESPACE_ENCODINGS[char] ?? char
    })
};
/**
 * @module path/toFileUrl
 * @name path/toFileUrl
 * @description A custom fork of https://deno.land/std@0.219.0/path/to_file_url.ts?s=toFileUrl
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toFileUrl
 * @param {String | URL} path https://deno.land/std@0.219.0/path/to_file_url.ts?s=toFileUrl
 * @returns {String}
 * @example
 * // ECMAScript
 * import toFileUrl from "path/toFileUrl";
 * // CommonJS
 * const toFileUrl = require("path/toFileUrl");
 * // Declarations
 * // posix
 * toFileUrl("", "") // Return ""
 * toFileUrl("", "") // Return ""
 * // win32
 * toFileUrl("", "") // Return ""
 * toFileUrl("", "") // Return ""
 */
export default function toFileUrl (path) {
    const already = ((function () {
        try {
            return new URL(path)
        } catch (error) {
            return undefined
        }
    })());
    if ((already instanceof URL == true ? already.protocol == "file:" : false) != true) {
        path = toString(already, {
            default: false
        }) || toString(path);
        if (isAbsolute(path) == true) {
            let url = new URL("file:///");
            if (isWindows == true) {
                const [, hostname, pathname] = path.match(TO_FILE_URL_WINDOWS_REGEX);
                url.pathname = encodeWhitespace(pathname.replace(TO_FILE_URL_REPLACE_PERCENTAGE_REGEX, "%25"));
                if (hostname != undefined && hostname != "localhost") {
                    url.hostname = hostname;
                    return (isString(url.hostname) == true ? url : "")
                } else return url
            } else {
                url.pathname = encodeWhitespace(path.replace(TO_FILE_URL_REPLACE_PERCENTAGE_REGEX, "%25").replace(TO_FILE_URL_REPLACE_SLASH_REGEX, "%5C"));
                return url
            }
        } else return ""
    } else return already
}