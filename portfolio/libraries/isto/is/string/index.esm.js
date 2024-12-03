/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
/**
 * @module isto/is/string
 * @name isto/is/string
 * @description Checks if the given value is a string.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isString
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.notEmpty] If false, considers empty strings as valid.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isString from "isto/is/string";
 * // CommonJS
 * const isString = require("isto/is/string");
 * // Declarations
 * // Return true
 * isString("My wonderful, sun-haired, blue-eyed, beautiful, kind, shy ?, ?, I love you, from ?.")
 * isString("", {
 *     notEmpty: false
 * })
 * // Return false
 * isString(1337)
 * isString("")
 */
export default function isString (value, options) {
    return typeof (value) == "string" ? options?.notEmpty != false ? value.length > 0 : true : false
}