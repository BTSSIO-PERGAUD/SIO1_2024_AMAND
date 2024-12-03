/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import fromFileUrl from "path/fromFileUrl";
import toString from "isto/to/string";
import isArray from "isto/is/array";
import toArray from "isto/to/array";
import toObject from "isto/to/object";
import isWindows from "path/utils/isWindows.esm.js";
import resolve from "path/resolve";
import isString from "isto/is/string";
import isNumber from "isto/is/number";
/**
 * @module un-ino
 * @name un-ino
 * @description unIno!!!
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toBoolean
 * @param {Object} [options] options!!!
 * @param {Boolean} [options.withPaths] withPaths!!!
 * @param {Array<String | URL>} paths paths!!!
 * @returns {Boolean | undefined}
 * @example
 * // ECMAScript
 * import unIno from "un-ino";
 * // CommonJS
 * const unIno = require("un-ino");
 * // Declarations
 * unIno({}, "")
 */
export default async function unIno (options, ...paths) {
    const withPaths = options?.withPaths == true;
    paths = (toArray(options, {
        default: false
    }))?.concat?.(paths) || [options, ...paths];
    return await (await (async function () {
        try {
            if (isWindows == true) {
                let result = new TextDecoder().decode((await new Deno.Command("powershell", {
                    args: ["-Command", `$paths = @(${paths.map(function (path) {
                        return resolve(toString(fromFileUrl(path), {
                            default: false
                        }) || toString(path))
                    }).filter(function (path) {
                        return isString(path) == true
                    }).map(function (path) {
                        return `"${path}"`
                    }).join(",")});$result = @${withPaths == true ? "{}" : "()"};foreach ($path in $paths) {$inode = fsutil file queryfileid $path;$value = [regex]::Match($inode, "0x[0-9a-fA-F]+").Value;$value = $value -replace '^0x';$value = "0\${value}";$bigint = [bigint]::Parse($value, [System.Globalization.NumberStyles]::AllowHexSpecifier);$decimalValue = [decimal]$bigint;$key = $decimalValue.ToString();$result${withPaths == true ? "[$key] = $path" : " += $key"}};$result | ConvertTo-Json`]
                }).output()).stdout);
                result = (withPaths == true ? Object.entries(toObject(result)).reduce(function (accumulator, [key, value]) {
                    key = toString(key).replace(/\D/g, ""), value = resolve(toString(value));
                    if ([key, value].every(function (property) {
                        return isString(property) == true
                    }) == true && isNumber(key, {
                        onlyPositive: true
                    }) == true) accumulator[key] = value
                    return accumulator
                }, {}) : (isArray(result) == true ? (toArray(result)).map(function (ino) {
                    return (toString(ino)).replace(/\D/g, "")
                }) : [(function (value) {
                    if (isNumber(value, {
                        onlyPositive: true
                    }) == true) return value
                })((toString(result)).replace(/\D/g, ""))]));
                return (paths.length == 1 ? (withPaths == true ? Object.entries(result) : result).shift() : result)
            } else {
                let result = (withPaths == true ? {} : []);
                for (const path of paths.map(function (path) {
                    return resolve(toString(fromFileUrl(path), {
                        default: false
                    }) || toString(path))
                }).filter(function (path) {
                    return isString(path) == true
                })) {
                    try {
                        const ino = toString((await Deno.stat(path)).ino || "");
                        if (withPaths == true && isNumber(ino, {
                            onlyPositive: true
                        }) == true) result[ino] = path
                        else result.push(ino)
                    } catch (error) {
                        undefined
                    }
                };
                return (paths.length == 1 ? (withPaths == true ? Object.entries(result).shift() : (function (value) {
                    if (isNumber(value, {
                        onlyPositive: true
                    }) == true) return value
                })(result.shift())) : result)
            }
        } catch (error) {
            return undefined
        }
    })())
}