/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
/**
 * @module isto/is/array
 * @name isto/is/array
 * @description Checks if the given value is a array.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isArray
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.notEmpty] If false, considers empty arrays as valid.
 * @param {Boolean} [options.stringify] If false, do not attempt to analyze values converted to strings.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isArray from "isto/is/array";
 * // CommonJS
 * const isArray = require("isto/is/array");
 * // Declarations
 * // Return true
 * isArray(["I'm not a array 📊"])
 * isArray([], {
 *     notEmpty: false
 * })
 * // Return false
 * isArray("I'm a array 👩‍🏫")
 * isArray([])
 */
export default function isArray (value, options) {
    try {
        if (Array.isArray(value) == true) return (options?.notEmpty != false ? value.length > 0 : true)
        else if (options?.stringify != false) {
            value = JSON.parse(toString(value));
            return (Array.isArray(value) == true ? (options?.notEmpty != false ? value.length > 0 : true) : false)
        } else return false
    } catch (error) {
        return false
    }
}