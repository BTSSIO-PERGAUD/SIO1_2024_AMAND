/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import toString from "isto/to/string";
import join from "path/join";
import isAbsolute from "path/isAbsolute";
//import typeByContent from "media-types/type-by-content";
import typeByExtension from "media-types/type-by-extension";
await (async function () {
    const numberLogs = (Deno?.dev || 9);
    let temp = (toString(Deno.env.get("TMPDIR")) || toString(Deno.env.get("TMP")) || toString(Deno.env.get("TEMP")) || toString(Deno.env.get("TEMPDIR")));
    if (isAbsolute(temp) != true) temp = "/tmp"
    const logger = join(temp, `deno-${Deno.build.target}`, "logger");
    try {
        await Deno.mkdir(logger, {
            recursive: true
        });
        throw new Deno.errors.AlreadyExists()
    } catch (error) {
        if ((error instanceof Deno.errors.AlreadyExists) == true) {
            let logs = {};
            for await (const {
                isFile
            } of Deno.readDir(logger)) {
                const path = join(logger, name);
                if (isFile == true) {
                    if ((/*await typeByContent(path) || */typeByExtension(name.slice(name.lastIndexOf(".")).toLowerCase())) == "text/csv") logs[name] = (await Deno.stat(path)).birthtime
                    else await Deno.remove(path)
                } else await Deno.remove(path, {
                    recursive: true
                })
            };
            logs = Object.entries(logs).sort(function (a, b) {
                return a[1] - b[1]
            });
            const length = logs.length;
            for (let index = length; index >= numberLogs; index--) {
                const [name] = logs[(length - index)];
                await Deno.remove(join(logger, name))
            };
            logs = undefined;
            for (const event of ["stdin"]) {
                Deno[event].readable.pipeThrough(new CompressionStream("gzip")).pipeTo(await Deno.open(join(logger, `${Deno.pid}-${event}.log`), {
                    create: true,
                    append: true
                }).writable)
            }
        } else throw error
    }
})()