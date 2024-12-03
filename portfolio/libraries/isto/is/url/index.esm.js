/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
/**
 * @module isto/is/url
 * @name isto/is/url
 * @description Checks if the given value is a url.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function isUrl
 * @param {any} value The value to be checked.
 * @returns {Boolean}
 * @example
 * // ECMAScript
 * import isUrl from "isto/is/url";
 * // CommonJS
 * const isUrl = require("isto/is/url");
 * // Declarations
 * isUrl("https://amandalexandre.fr") // Return true
 * isUrl("/i-am-a-url") // Return false
 */
export default function isUrl (value) {
    try {
        new URL(value);
        return true
    } catch (error) {
        return false
    }
}