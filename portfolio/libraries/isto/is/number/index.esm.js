/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
/**
 * @module isto/is/number
 * @name isto/is/number
 * @description Checks if the given value is a number.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isNumber
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.onlyPositive] If true, only positive values are true.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isNumber from "isto/is/number";
 * // CommonJS
 * const isNumber = require("isto/is/number");
 * // Declarations
 * // Return true
 * isNumber(0)
 * isNumber(1, {
 *     onlyPositive: true
 * })
 * // "I'm not a number 🔟"
 * // Return false
 * isNumber("I'm a number 📞")
 * isNumber(0, {
 *     onlyPositive: true
 * })
 */
export default function isNumber (value, options) {
    value = Number(value);
    return (isNaN(value) == false ? (options?.onlyPositive == true ? value > 0 : true) : false)
}