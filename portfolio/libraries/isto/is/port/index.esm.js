/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
const regPort = new RegExp("^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$");
/**
 * @module isto/is/port
 * @name isto/is/port
 * @description Checks if the given value is a port.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isPort
 * @param {any} value The value to be checked.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isPort from "isto/is/port";
 * // CommonJS
 * const isPort = require("isto/is/port");
 * // Declarations
 * // Return true
 * isPort(3009)
 * isPort("2003")
 * isPort(0) // Return false
 */
export default function isPort (value) {
    return regPort.test(toString(value)) == true
}