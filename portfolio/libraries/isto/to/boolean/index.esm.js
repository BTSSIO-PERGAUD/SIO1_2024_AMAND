/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isString from "isto/is/string";
import isBoolean from "isto/is/boolean";
/**
 * @module isto/to/boolean
 * @name isto/to/boolean
 * @description Convert the given value into a boolean.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toBoolean
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, false is not returned.
 * @returns {Boolean | undefined}
 * @example
 * // ECMAScript
 * import toBoolean from "isto/to/boolean";
 * // CommonJS
 * const toBoolean = require("isto/to/boolean");
 * // Declarations
 * toBoolean("true") // Return true
 * toBoolean(undefined) // Return false
 * toBoolean("", {
 *     default: false
 * }) // Return undefined
 */
export default function toBoolean (value, options) {
    try {
        if (isBoolean(value) == true) return (isString(value) == true ? JSON.parse(value) : value)
        else if (options?.default != false) return false
    } catch (error) {
        if (options?.default != false) return false
    }
}