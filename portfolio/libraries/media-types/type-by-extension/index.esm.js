/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import resolve from "path/resolve";
import toString from "isto/to/string";
const extensions = JSON.parse(await Deno.readTextFile(resolve("./libraries/media-types/mimeByExtensions.db.json")));
/**
 * @module media-types/type-by-extension
 * @name media-types/type-by-extension
 * @description Gives the MIME-Type of a file extension.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function typeByExtension
 * @param {String} extension A file extension with or without a dot.
 * 
 * https://github.com/jshttp/mime-db
 * @returns {String | undefined}
 * @example
 * // ECMAScript
 * import typeByExtension from "media-types/type-by-extension";
 * // CommonJS
 * const typeByExtension = require("media-types/type-by-extension");
 * // Declarations
 * typeByExtension("mp4") // Return "video/mp4"
 * typeByExtension(".emma") // Return "application/emma+xml"
 */
export default function typeByExtension (extension) {
    extension = toString(extension);
    return extensions?.[extension.startsWith(".") == true ? extension.slice(1) : extension]
}