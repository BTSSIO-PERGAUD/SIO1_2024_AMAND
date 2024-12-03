/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
/**
 * @module isto/is/object
 * @name isto/is/object
 * @description Checks if the given value is a object.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isObject
 * @param {any} value The value to be checked.
 * @param {Object} [options] Additional verification options.
 * @param {Boolean} [options.notEmpty] If false, considers empty objects as valid.
 * @param {Boolean} [options.stringify] If false, do not attempt to analyze values converted to strings.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isObject from "isto/is/object";
 * // CommonJS
 * const isObject = require("isto/is/object");
 * // Declarations
 * // Return true
 * isObject({
 *     key: "value"
 * })
 * isObject({}, {
 *     notEmpty: false
 * })
 * // "I'm not a object 📦"
 * // Return false
 * isObject("I'm a object 👀")
 * isObject({})
 */
export default function isObject (value, options) {
    try {
        if (typeof (value) == "object" && value != null && value?.constructor == Object) return options?.notEmpty != false ? Object.keys(value).length > 0 : true
        else if (options?.stringify != false) {
            value = JSON.parse(toString(value));
            return typeof (value) == "object" && value != null && value?.constructor == Object ? options?.notEmpty != false ? Object.keys(value).length > 0 : true : false
        } else return false
    } catch (error) {
        return false
    }
}