/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isString from "isto/is/string";
Function.prototype.toJSON = Function.prototype.toString;
/**
 * @module isto/to/string
 * @name isto/to/string
 * @description Convert the given value into a string.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toString
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, "" is not returned.
 * @returns {String | undefined}
 * @example
 * // ECMAScript
 * import toString from "isto/to/string";
 * // CommonJS
 * const toString = require("isto/to/string");
 * // Declarations
 * toString(123) // Return ("sun" 🤔 ...oops 🤭) "123"
 * toString(undefined) // Return ""
 * toString("", {
 *     default: false
 * }) // Return undefined
 */
export default function toString (value, options) {
    try {
        return (isString(value) != true ? (typeof (value) != "undefined" && options?.json != true ? (String(value) || "") : (JSON.stringify(value) || "")) : value)
    } catch (error) {
        if (options?.default != false) return ""
    }
}