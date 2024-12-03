/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import fromFileUrl from "path/fromFileUrl";
import isArray from "isto/is/array";
import toString from "isto/to/string";
import isString from "isto/is/string";
import separator from "path/utils/separator.esm.js";
import isWindows from "path/utils/isWindows.esm.js";
import isPathSeparator from "path/utils/isPathSeparator.esm.js";
import normalize from "path/normalize";
/**
 * @module path/join
 * @name path/join
 * @description A custom fork of https://deno.land/std@0.219.0/path/join.ts?s=join
 * @license MIT
 * @author Deno <support@deno.com>
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function join
 * @param {Array<String | URL>} paths https://deno.land/std@0.219.0/path/join.ts?s=join#function_join_0_parameters__object_Object_
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
export default function join (...paths) {
    paths = paths.map(function (value) {
        return toString(fromFileUrl(value), {
            default: false
        }) || toString(value, {
            default: false
        })
    }).filter(function (value) {
        return isString(value) == true
    });
    if (isArray(paths) == true) {
        let joined, firstPart = null;
        for (let index = 0, length = paths.length; index < length; ++index) {
            const path = paths[index];
            if (isString(joined) == true) joined += `${separator}${path}`
            else joined = (isWindows == true ? (firstPart = path) : path)
        };
        if (isString(joined) == true) {
            if (isWindows == true) {
                if (isString(firstPart) == true) {
                    let needsReplace = true, slashCount = 0;
                    if (isPathSeparator(firstPart.charCodeAt(0)) == true) {
                        ++slashCount;
                        const firstLength = firstPart.length;
                        if (firstLength > 1 && isPathSeparator(firstPart.charCodeAt(1)) == true) {
                            ++slashCount;
                            if (firstLength > 2) {
                                if (isPathSeparator(firstPart.charCodeAt(2)) == true) ++slashCount
                                else needsReplace = false
                            }
                        }
                    };
                    if (needsReplace == true) {
                        for (; slashCount < joined.length; ++slashCount) {
                            if (!isPathSeparator(joined.charCodeAt(slashCount))) break
                        };
                        if (slashCount >= 2) joined = `\\${joined.slice(slashCount)}`
                    };
                    return normalize(joined)
                } else return "."
            } else return normalize(joined)
        } else return "."
    } else return "."
}