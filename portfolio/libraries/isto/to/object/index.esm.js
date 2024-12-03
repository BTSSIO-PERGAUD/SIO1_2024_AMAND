/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isString from "isto/is/string";
import isObject from "isto/is/object";
/**
 * @module isto/to/object
 * @name isto/to/object
 * @description Convert the given value into a object.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function toObject
 * @param {any} value The value to be converted.
 * @param {Object} [options] Additional conversion options.
 * @param {Boolean} [options.default] If false, {} is not returned.
 * @returns {Object | undefined}
 * @example
 * // ECMAScript
 * import toObject from "isto/to/object";
 * // CommonJS
 * const toObject = require("isto/to/object");
 * // Declarations
 * toObject("{key: \"value\"}") // Return {key: "value"}
 * toObject(undefined) // Return {}
 * toObject("", {
 *     default: false
 * }) // Return undefined
 */
export default function toObject (value, options) {
    try {
        if (isObject(value) == true) return (isString(value) == true ? JSON.parse(value) : value)
        else if (options?.default != false) return {}
    } catch (error) {
        if (options?.default != false) return {}
    }
}