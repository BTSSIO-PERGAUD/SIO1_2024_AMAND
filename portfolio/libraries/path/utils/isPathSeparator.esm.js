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
import toNumber from "isto/to/number";
import isWindows from "path/utils/isWindows.esm.js";
const CHAR_FORWARD_SLASH = 47, CHAR_BACKWARD_SLASH = 92;
export default function isPathSeparator (code) {
    code = toNumber(code);
    return (isWindows == true ? [CHAR_FORWARD_SLASH, CHAR_BACKWARD_SLASH].some(function (slash) {
        return code == slash
    }) == true : code == CHAR_FORWARD_SLASH)
}