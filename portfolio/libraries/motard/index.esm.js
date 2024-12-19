/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import entryType from "entry-type";
import join from "path/join";
import isString from "isto/is/string";
import isArray from "isto/is/array";
import isNumber from "isto/is/number";
import toString from "isto/to/string";
import toArray from "isto/to/array";
import separator from "path/utils/separator.esm.js";
import resolve from "path/resolve";
import relative from "path/relative";
/**
 * A dotless file extension accepted for creating routes defined by sources supported by the MIME database provided by jshttp.
 * 
 * https://github.com/jshttp/mime-db
 * @typedef {String} extension
 */
/**
 * An array of dotless file extensions accepted for route creation defined by sources supported by the MIME database provided by jshttp.
 * 
 * https://github.com/jshttp/mime-db
 * @name extensions
 * @example
 * // ECMAScript
 * import {
 *     extensions
 * } from "motard";
 * // CommonJS
 * let {
 *     extensions
 * } = require("motard");
 * // Declaration
 * extensions = ["html", "jsx", "tsx"]
 * @type {Array<extension>}
 * @default
 */
export let extensions = ["html", "js", "jsx", "ts", "tsx"];
function checkEntry (basename, method, type, name) {
    const beforeExtension = basename.replace(/(?<!\[)\[(\.\.\.\w+)](?!\])/g, "").indexOf("."), entryName = beforeExtension > 0 ? basename.slice(0, beforeExtension) : basename;
    return (typeof (name) == "undefined" ? true : name?.toLowerCase() == entryName.toLowerCase()) == true && (type == "directory" ? true : type == "file" && new RegExp(`.${method}`, "i").test(basename) == true && extensions.some(function (ext) {
        return new RegExp(`.${ext}$`, "i").test(basename) == true
    }) == true) == true
};
/**
 * A path to a folder compatible with appendix D of the RFC8089 standard.
 * 
 * https://datatracker.ietf.org/doc/html/rfc8089#appendix-D
 * @name path
 * @example
 * // ECMAScript
 * import {
 *     path
 * } from "motard";
 * // CommonJS
 * let {
 *     path
 * } = require("motard");
 * // Declaration
 * path = "path/to/directory"
 * @type {String}
 * @default
 */
export let path = "routes";
/**
 * An HTTP method defined by the RFC9110 standard.
 * 
 * https://deno.land/api@v1.41.0?s=Request#prop_method
 * @typedef {String} method
 */
/**
 * An array of HTTP methods defined by the RFC9110 standard.
 * 
 * https://datatracker.ietf.org/doc/html/rfc9110#name-method-definitions
 * @name methods
 * @example
 * // ECMAScript
 * import {
 *     methods
 * } from "motard";
 * // CommonJS
 * let {
 *     methods
 * } = require("motard");
 * // Declaration
 * methods = ["GET", "POST", "PUT", "DELETE"]
 * @type {Array<method>}
 * @default
 */
export let methods = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];
/**
 * @typedef {String} routes
 */
/**
 * @typedef {String} type
 */
/**
 * @typedef {Object.<string, string>} params
 */
/**
 * @module motard
 * @name motard
 * @description URL Router for Front-End
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function motard
 * @async
 * @param {String | URL} url https://deno.land/api@v1.41.0?s=URL
 * @param {method} method https://deno.land/api@v1.41.0?s=Request#prop_method
 * @returns {[routes, type, params]}
 * @throws Throws a Deno.errors.InvalidData error if {@link path} is not a path to a folder or if {@link methods} is not an array containing one or more character strings.
 * @example
 * // ECMAScript
 * import motard from "motard";
 * // CommonJS
 * const motard = require("motard");
 * // Declarations
 * motard("http://localhost/favicon.ico") // Return ["path/to/favicon.ico", "file", {}]
 * motard("https://localhost/api/blog/990195360314044496/Video%20game/JavaScript/DisWorld/Post-apocalyptic/Zombies/Survival/Open%20World/FPS/PVP/PVE") // Return ["path/to/api/blog/[id]/[...tags].POST.PUT.DELETE.js", "file", { id: "990195360314044496", tags: ["Video game", "JavaScript", "DisWorld", "Post-apocalyptic", "Zombies", "Survival", "Open World", "FPS", "PVP", "PVE"] }]
 * motard("http://localhost") // Return ["path/to/index.GET.html", "file", {}]
 * motard("https://localhost/api") // Return ["path/to/api", "directory", {}]
 * // ⚠️ As described in the note to reference 15.3.4 of ECMAScript 262 standard, since an arrow function has no binding of its own with this, super, new.target and arguments references, if you want to use these bindings, make sure your function is in a lexically enclosing environment resulting in the use of the function operator. https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-runtime-semantics-instantiatearrowfunctionexpression
 * // path/to/_app.esm.js [optional]
 * import hoptitml from "hoptitml";
 * export default function _app (body, head) {
 *     console.log(`${new URL(this.request.url).pathname}:`, this.params);
 *     return new hoptitml(`
 *         <!doctype html>
 *         <html lang="en">
 *             <head>
 *                 <meta charset="utf-8" />
 *                 ${head}
 *             </head>
 *             <body>
 *                 ${body}
 *             </body>
 *         </html>
 *     `)
 * }
 * // path/to/_directory.esm.js [optional]
 * import hoptitml from "hoptitml";
 * import toString from "isto/to/string";
 * import separator from "path/utils/separator.esm.js";
 * export default async function _directory () {
 *     const path = toString(this.params?.[":path"]), pathname = new URL(this.request.url).pathname.replace(/\/$/, "");
 *     let items = (pathname.endsWith("/") != true ? `${pathname}/` : pathname).lastIndexOf("/") > 0 ? [`<li style="list-style-type: square"><a href="${toString(pathname.slice(0, pathname.lastIndexOf("/")), {
 *         default: false
 *     }) || "/"}">../</a></li>`] : [];
 *     for await (const {
 *         isDirectory,
 *         name
 *     } of Deno.readDir(path)) {
 *         items.push(`<li style="list-style-type: ${isDirectory == true ? "square" : "circle"}"><a href="${`${pathname}/${name}`}">${name}</a></li>`)
 *     };
 *     return new hoptitml(`
 *         <h1>${path.slice(path.lastIndexOf(separator) + 1)}</h1>
 *         <ul>${items.join("")}</ul>
 *     `)
 * }
 * // path/to/api/blog/[id]/[...tags].POST.PUT.DELETE.js
 * import isObject from "isto/is/object/index.esm.js";
 * import toArray from "isto/to/array/index.esm.js";
 * import isString from "isto/is/string/index.esm.js";
 * import isArray from "isto/is/array/index.esm.js";
 * export default async function tags () {
 *     const blog = (await this.db.get(["blog", Number(this.params?.id)]))?.value, tgs = (toArray(this.params?.tags, {
 *         default: false
 *     }))?.filter(function (tag) {
 *         return isString(tag) == true
 *     });
 *     if (isObject(blog) == true) {
 *         if (isArray(tgs) == true) {
 *             const method = this.request.method, key = ["blog", blog.id, "tags"], currentTgs = (await this.db.get(key))?.value;
 *             if (isArray(currentTgs) == true) {
 *                 if (method == "POST") this.db.set(key, [...currentTgs, ...tgs]).then(function ({
 *                     ok
 *                 }) {
 *                     return ok == true
 *                 }).catch(function () {
 *                     return false
 *                 })
 *                 else if (method == "PUT") this.db.set(key, tgs).then(function ({
 *                     ok
 *                 }) {
 *                     return ok == true
 *                 }).catch(function () {
 *                     return false
 *                 })
 *                 else if (method == "DELETE") this.db.set(key, currentTgs.filter(function (tag) {
 *                     return tgs.some(function (tg) {
 *                         return tag == tg
 *                     }) != true
 *                 })).then(function ({
 *                     ok
 *                 }) {
 *                     return ok == true
 *                 }).catch(function () {
 *                     return false
 *                 })
 *                 else throw {
 *                     name: Deno.errors.NotSupported.name,
 *                     status: 405
 *                 }
 *             } else if (["POST", "PUT"].some(function (mtd) {
 *                 return method == mtd
 *             }) == true) this.db.set(key, tgs).then(function ({
 *                 ok
 *             }) {
 *                 return ok == true
 *             }).catch(function () {
 *                 return false
 *             })
 *             else throw {
 *                 name: Deno.errors.NotSupported.name,
 *                 status: 405
 *             }
 *         } else throw {
 *             name: Deno.errors.InvalidData.name,
 *             status: 400
 *         }
 *     } else throw {
 *         name: Deno.errors.NotFound.name,
 *         status: 404
 *     }
 * }
 * // path/to/index.GET.html
 * <h1>Hello from Motard.js!</h1>
 */
export default async function motard (url, method) {
    url = new URL(url), method = (toString(method, {
        default: false
    }))?.toUpperCase();
    if (await entryType(resolve(path)) == "directory" && (methods = (toArray(methods)).map(function (mtd) {
        return toString(mtd, {
            default: false
        })
    }).filter(function (mtd) {
        return isString(mtd) == true
    })).some(function (mtd) {
        return method == mtd
    }) == true) {
        extensions = (toArray(extensions)).map(function (ext) {
            return toString(ext, {
                default: false
            })
        }).filter(function (ext) {
            return isString(ext) == true
        });
        let routes = path, type = "directory", params = {}, entries = [...`${url.pathname}${url.hash}`.split("/").filter(function (route) {
            return isString(route) == true
        }).entries()], catching;
        for (const [index, baseroute] of entries) {
            const [route, typ, [key, value]] = await (async function (path) {
                try {
                    const fullname = path.slice(path.lastIndexOf(separator) + 1);
                    try {
                        return [fullname, await entryType(path), []]
                    } catch (error) {
                        let beforeExtension = fullname.replace(/(?<!\[)\[(\.\.\.\w+)](?!\])/g, "").indexOf(".");
                        const pureName = beforeExtension > 0 ? fullname.slice(0, beforeExtension) : fullname;
                        for await (const {
                            isFile,
                            isDirectory,
                            name: entryName
                        } of Deno.readDir(path.slice(0, path.lastIndexOf(separator)))) {
                            const type = isFile == true ? "file" : isDirectory == true ? "directory" : undefined;
                            if (checkEntry(entryName, method, type, pureName)) return [entryName, type, []]
                        };
                        for await (const {
                            isFile,
                            isDirectory,
                            name: entryName
                        } of Deno.readDir(path.slice(0, path.lastIndexOf(separator)))) {
                            const type = isFile == true ? "file" : isDirectory == true ? "directory" : undefined;
                            if (!checkEntry(entryName, method, type, pureName)) {
                                beforeExtension = entryName.replace(/(?<!\[)\[(\.\.\.\w+)](?!\])/g, "").indexOf(".");
                                const name = beforeExtension > 0 ? entryName.slice(0, beforeExtension) : entryName, paramReg = [/(?<!\[)\[(\.\.\.\w+)](?!\])/g.exec(name), /\[(\w+)]/g.exec(name)].find(function (regexp) {
                                    return isArray(regexp) == true
                                });
                                let param = (paramReg != null ? (name.match(new RegExp(pureName.slice(0, paramReg.index) + "(.+)" + pureName.slice(((paramReg.index + ((paramReg[1]).length + 1)) + 1)))))?.[1] : undefined);
                                param = [/(?<!\[)\[(\.\.\.\w+)](?!\])/g.exec(param), /\[(\w+)]/g.exec(param)].find(function (regexp) {
                                    return isArray(regexp) == true
                                })?.[1];
                                /*console.log("motard:", {
                                    name, pureName, paramReg, value: paramReg?.[1], param, slice: name.slice(0, paramReg.index) + "(.+)" + name.slice(((paramReg.index + ((paramReg[1]).length + 1)) + 1))
                                });*/
                                if (isString(param) == true) {
                                    //console.log(name, pureName.slice(0, paramReg.index) + "(.+)" + pureName.slice(((paramReg.index + ((paramReg[1]).length + 1)) + 1)));
                                    beforeExtension = param.lastIndexOf(".");
                                    const catchAll = beforeExtension > 0;
                                    if (checkEntry(entryName, method, type) == true) {
                                        if (catchAll == true) catching = index + 1
                                        return [entryName, type, catchAll == true ? [param.slice(beforeExtension + 1), [pureName]] : [param, pureName]]
                                    }
                                }
                            }
                        };
                        throw undefined
                    }
                } catch (error) {
                    return [undefined, undefined, []]
                }
            })(join(routes, baseroute));
            if ([route, typ].every(function (argument) {
                return isString(argument) == true
            }) == true) {
                routes = join(routes, route), type = typ;
                if (isString(key) == true) {
                    if (isArray(value) == true && isNumber(catching) == true) {
                        params[key] = [...value, ...entries.slice(catching).map(function ([, route]) {
                            return route
                        })];
                        break
                    } else params[key] = value
                }
            }
        };
        if (type == "directory") {
            for await (const {
                isFile,
                name
            } of Deno.readDir(routes)) {
                if ((isFile == true ? checkEntry(name, method, "file", "index") : false) == true) return [join(routes, name), "file", params]
            };
            return [routes, type, params]
        } else return Object.entries(params).some(function ([, value]) {
            return isArray(value) == true
        }) == true || relative(path, routes).split(separator).length == entries.length ? [routes, type, params] : [undefined, undefined, {}]
    } else throw new Deno.errors.InvalidData()
}