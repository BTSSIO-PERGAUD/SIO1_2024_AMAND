/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
/**
 * @module isto/is/boolean
 * @name isto/is/boolean
 * @description Checks if the given value is a boolean.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isBoolean
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.strict] If false, the values are evaluated using the Boolean object.
 * @param {Boolean} [options.stringify] If false, do not attempt to analyze values converted to strings.
 * @param {Boolean} [options.binary] If true, binary values are considered valid Boolean values (1 and 0).
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isBoolean from "isto/is/boolean";
 * // CommonJS
 * const isBoolean = require("isto/is/boolean");
 * // Declarations
 * // Return true
 * isBoolean(false)
 * isBoolean("I'm not a boolean 🤖", {
 *     strict: false
 * })
 * // Return false
 * isBoolean(#VALUE#)
 * isBoolean("I'm a boolean 👨")
 */
export default function isBoolean (value, options) {
    if (options?.strict != false) {
        if (typeof (value) == "boolean") return true
        else if (options?.stringify != false) {
            let booleans = [true, false];
            if (options?.binary == true) {
                for (const binary of [1, 0]) {
                    booleans.push(binary)
                }
            };
            value = (toString(value)).toLowerCase();
            return booleans.some(function (bool) {
                return value == toString(bool)
            }) == true
        } else return false
    } else {
        if (options?.stringify != false) {
            value = toString(value);
            return Boolean(value)
        } else return Boolean(value)
    }
}