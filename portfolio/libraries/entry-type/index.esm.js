/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
/**
 * @module entry-type
 * @name entry-type
 * @description Detects whether a given path is a file or a folder.
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function entryType
 * @async
 * @param {String | URL} path https://docs.deno.com/api/deno/~/Deno.stat#function_stat_0_parameters_path
 * @returns {Promise<"file" | "directory" | undefined>}
 * @example
 * // ECMAScript
 * import entryType from "entry-type";
 * // CommonJS
 * const entryType = require("entry-type");
 * // Declarations
 * entryType("path/to/file") // Return "file"
 * entryType("path/to/directory") // Return "directory"
 * entryType("path/to/not_a_file_or_directory") // Return undefined
 */
export default async function entryType (path) {
    const {
        isFile,
        isDirectory
    } = await Deno.stat(path);
    if (isFile == true) return "file"
    else if (isDirectory == true) return "directory"
}