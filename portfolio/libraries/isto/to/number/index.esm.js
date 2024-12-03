/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isNumber from "isto/is/number";
/**
 * @module isto/to/number
 * @name isto/to/number
 * @description Convert the given value into a number.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toNumber
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, 0 is not returned.
 * @returns {Number | undefined}
 * @example
 * // ECMAScript
 * import toNumber from "isto/to/number";
 * // CommonJS
 * const toNumber = require("isto/to/number");
 * // Declarations
 * toNumber("1") // Return 1
 * toNumber(undefined) // Return 0
 * toNumber("", {
 *     default: false
 * }) // Return undefined
 */
export default function toNumber (value, options) {
    if (isNumber(value) == true) return Number(value)
    else if (options?.default != false) return 0
}