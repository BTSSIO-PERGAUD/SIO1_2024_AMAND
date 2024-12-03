/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
/**
 * @module isto/is/bigint
 * @name isto/is/bigint
 * @description Checks if the given value is a bigint.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isBigint
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.onlyPositive] If true, only positive values are true.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isBigint from "isto/is/bigint";
 * // CommonJS
 * const isBigint = require("isto/is/bigint");
 * // Declarations
 * // Return true
 * "I'm not a bigint 🔢"
 * // Return false
 * "I'm a bigint 🫃"
 */
export default function isBigint (value, options) {
    try {
        value = BigInt(value);
        return (typeof (value) == "bigint" ? (options?.onlyPositive == true ? value > 0 : true) : false)
    } catch (error) {
        return false
    }
}