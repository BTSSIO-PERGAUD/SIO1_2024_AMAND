/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isBigint from "isto/is/bigint";
/**
 * @module isto/to/bigint
 * @name isto/to/bigint
 * @description Convert the given value into a bigint.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toBigint
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, 0n is not returned.
 * @returns {BigInt | undefined}
 * @example
 * // ECMAScript
 * import toBigint from "isto/to/bigint";
 * // CommonJS
 * const toBigint = require("isto/to/bigint");
 * // Declarations
 */
export default function toBigint (value, options) {
    if (isBigint(value) == true) return BigInt(value)
    else if (options?.default != false) return BigInt(0)
}