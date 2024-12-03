/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import fromFileUrl from "path/fromFileUrl";
import join from "path/join";
import basename from "path/basename";
import isArray from "isto/is/array";
import toString from "isto/to/string";
import toArray from "isto/to/array";
import toObject from "isto/to/object";
import resolve from "path/resolve";
import unIno from "un-ino";
import isString from "isto/is/string";
let inos = new Map();
async function recursive (path, paths = []) {
    try {
        for await (let {
            isDirectory,
            isSymlink,
            name
        } of Deno.readDir(path)) {
            if (isSymlink == true) {
                const pathSymlink = join(path, name);
                ({
                    isDirectory,
                    name
                } = {
                    isDirectory: (await Deno.stat(pathSymlink)).isDirectory,
                    name: basename(pathSymlink)
                })
            };
            const fullPath = join(path, name);
            paths.push(fullPath);
            if (isDirectory == true) await recursive(fullPath, paths)
        };
        return paths
    } catch (error) {
        paths.push(join(path, basename(path)));
        return paths
    }
};
// Rendre possible _inos dans un code de prod, seulement, inos = _inos n'est pas possible, car inos est une variable global (et elle le restera, pour éviter de répeter de future opération), donc il faut en sorte d'éviter des itérations inutile de la fonction recursive
/**
 * @module re-watcher
 * @name re-watcher
 * @description reWatcher!!!
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @class
 * @extends EventTarget
 * @example
 * // ECMAScript
 * import reWatcher from "re-watcher";
 * // CommonJS
 * const reWatcher = require("re-watcher");
 * // Declarations
 * const watcher = new reWatcher()
 */
export default class reWatcher extends EventTarget {
    constructor() {
        super();
        return Object.assign((async function reWatcher (paths, options, _inos) {
            paths = (isArray(paths) == true ? paths.map(function (path) {
                return resolve(toString(fromFileUrl(path), {
                    default: false
                }) || toString(path))
            }) : [resolve(toString(fromFileUrl(paths), {
                default: false
            }) || toString(paths))]);
            if ((_inos instanceof Map) == true) inos = _inos
            if (inos.size <= 0) {
                let recValue = [];
                for (const path of [...new Set(paths)]) {
                    for (const fullPath of await recursive(path)) {
                        recValue.push(fullPath)
                    }
                };
                for (const [
                    ino,
                    inoPath
                ] of ((function (value) {
                    return (toArray(Object.entries(toObject(value)), {
                        default: false
                    }) || (isArray(value) == true ? [toArray(value, {
                        default: false
                    })] : []))
                })(await unIno({
                    withPaths: true
                }, ...recValue)))) {
                    inos.set(ino, inoPath)
                }
            };
            for await (let {
                kind,
                paths: watchPaths
            } of new Proxy(Deno.watchFs, {
                apply: (target, thisArg, argArray) => {
                    this.dispatchEvent(new CustomEvent("init"));
                    return target.apply(thisArg, argArray)
                }
            })(paths, options)) {
                if (["modify", "create"].some(function (kd) {
                    return kind == kd
                }) == true) {
                    let events = {
                        rename: [],
                        kind: []
                    };
                    const watchInos = await unIno(watchPaths);
                    for (let index = 0; index < watchInos.length; index++) {
                        const ino = watchInos[index], watchPath = toString(paths[index], {
                            default: false
                        });
                        if (isNumber(ino, {
                            onlyPositive: true
                        }) == true && isString(watchPath) == true) {
                            if (kind == "modify") {
                                if (inos.has(ino) == true) {
                                    const inoPath = inos.get(ino);
                                    if (watchPath != inoPath) {
                                        inos.set(ino, watchPath);
                                        events.rename.push([watchPath, inoPath])
                                    } else events.kind.push(watchPath)
                                } else {
                                    inos.set(ino, watchPath);
                                    events.kind.push(watchPath)
                                }
                            } else if (kind == "create") {
                                inos.set(ino, watchPath);
                                events.kind.push(watchPath)
                            }
                        }
                    };
                    if (isArray(events.rename) == true) this.dispatchEvent(new CustomEvent("rename", {
                        detail: events.rename
                    }))
                    if (isArray(events.kind) == true) this.dispatchEvent(new CustomEvent(kind, {
                        detail: events.kind
                    }))
                } else this.dispatchEvent(new CustomEvent(kind, {
                    detail: watchPaths
                }))
                /*for (const path of watchPaths) {
                    if (kind == "modify") {
                        const ino = await unIno(path);
                        if (isString(ino) == true) {
                            if (inos.has(ino) == true) {
                                const inoPath = inos.get(ino);
                                if (path != inoPath) {
                                    inos.set(ino, path);
                                    this.dispatchEvent(new CustomEvent("rename", {
                                        detail: [path, inoPath]
                                    }))
                                } else this.dispatchEvent(new CustomEvent(kind, {
                                    detail: path
                                }))
                            } else {
                                inos.set(ino, path);
                                this.dispatchEvent(new CustomEvent(kind, {
                                    detail: path
                                }))
                            }
                        }
                        // else ?
                    } else if (kind == "create") {
                        const ino = await unIno(path);
                        if (isString(ino) == true) {
                            inos.set(ino, path);
                            this.dispatchEvent(new CustomEvent(kind, {
                                detail: path
                            }))
                        }
                    } else this.dispatchEvent(new CustomEvent(kind, {
                        detail: path
                    }))
                }*/
            }
        }).bind(this), (function (EventEmitter) {
            for (let key in EventEmitter) {
                if (typeof (EventEmitter[key]) == "function") EventEmitter[key] = EventEmitter[key].bind(EventEmitter)
            };
            return EventEmitter
        })(this))
    }
}