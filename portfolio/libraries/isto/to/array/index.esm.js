/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isString from "isto/is/string";
import isArray from "isto/is/array";
/**
 * @module isto/to/array
 * @name isto/to/array
 * @description Convert the given value into a array.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toArray
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, [] is not returned.
 * @returns {Array | undefined}
 * @example
 * // ECMAScript
 * import toArray from "isto/to/array";
 * // CommonJS
 * const toArray = require("isto/to/array");
 * // Declarations
 * toArray("[\"DisWorld ✨\"]") // Return ["DisWorld ✨"]
 * toArray(undefined) // Return []
 * toArray("", {
 *     default: false
 * }) // Return undefined
 */
export default function toArray (value, options) {
    try {
        if (isArray(value) == true) return (isString(value) == true ? JSON.parse(value) : value)
        else if (options?.default != false) return []
    } catch (error) {
        if (options?.default != false) return []
    }
}