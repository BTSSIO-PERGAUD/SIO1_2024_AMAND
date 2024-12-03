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
/**
 * @module path
 * @name path
 * @description A custom fork of https://deno.land/std@0.219.0/path/mod.ts
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @example
 * // ECMAScript
 * import path from "path";
 * // CommonJS
 * const path = require("path");
 */
export {
    default as basename
} from "path/basename";
export {
    default as fromFileUrl
} from "path/fromFileUrl";
export {
    default as isAbsolute
} from "path/isAbsolute";
export {
    default as join
} from "path/join";
export {
    default as normalize
} from "path/normalize";
export {
    default as relative
} from "path/relative";
export {
    default as resolve
} from "path/resolve";
export {
    default as toFileUrl
} from "path/toFileUrl";