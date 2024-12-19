/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import typeByExtension from "media-types/type-by-extension";
import join from "path/join";
import resolve from "path/resolve";
import toFileUrl from "path/toFileUrl";
import {
    extensions,
    path as routes,
    default as router
} from "motard";
import renderer from "preact-render-to-string";
import entryType from "entry-type";
import toNumber from "isto/to/number";
import toString from "isto/to/string";
import isString from "isto/is/string";
import isNumber from "isto/is/number";
import separator from "path/utils/separator.esm.js";
import {
    createGitHubOAuthConfig,
    createHelpers
} from "kv-oauth";
import {
    setCookie,
    getCookies
} from "cookie";
import {
    DOMParser
} from "deno-dom";
Deno.dev = (toString(Deno.env.get("DENO_ENV"))).toLowerCase() != "production", Deno.errors.keys = Object.keys(Deno.errors);
function send (data, extension, status, hdrs = headers) {
    let bag;
    const contentType = toString(typeByExtension(extension), {
        default: false
    });
    status = toNumber(status, {
        default: false
    });
    if (isString(contentType) == true) {
        hdrs.set("Content-Type", contentType);
        bag = {
            type: contentType
        }
    };
    let options = {
        headers: hdrs
    };
    if (isNumber(status, {
        onlyPositive: true
    }) == true) options["status"] = status
    return new Response((data instanceof ReadableStream) == true ? data : new Blob([new TextEncoder().encode(data)], bag).stream(), options)
};
async function find (status) {
    const isError = isNumber(status, {
        onlyPositive: true
    }), isApp = toString(status).toLowerCase() == "app", isDirectory = toString(status).toLowerCase() == "directory";
    for await (const {
        isFile,
        name
    } of Deno.readDir(routes)) {
        if (isFile == true) {
            const extension = name.slice(name.lastIndexOf(".")).toLowerCase(), beforeExtension = name.replace(/(?<!\[)\[(\.\.\.\w+)](?!\])/g, "").indexOf("."), pureName = (beforeExtension > 0 ? name.slice(0, beforeExtension) : name).toLowerCase();
            if ((isError == true ? `_${status}` == pureName : pureName == (isApp == true ? "_app" : (isDirectory == true ? "_directory" : "_error"))) == true && js.some(function (ext) {
                return `.${ext}` == extension
            }) == true) return join(routes, name)
        }
    };
    if (isError == true) return await find()
    else throw undefined
};
const kv = (function (kv) {
    addEventListener("beforeunload", async function () {
        return await kv.close()
    });
    return kv
})(await Deno.openKv("./PORTFOLIO")), js = extensions.slice(1), tlsKey = resolve((Deno.env.get("PORTFOLIO_TLS_KEY") || "./tls.key")), tlsCrt = resolve((Deno.env.get("PORTFOLIO_TLS_CRT") || "./tls.crt")), host = (function () {
    try {
        return new URL(`http://${Deno.env.get("PORTFOLIO_HOST") || ""}`)
    } catch (err) {
        return undefined
    }
})(), port = await (async function (value) {
    return await (async function () {
        try {
            return await entryType(tlsKey) == "file" && await entryType(tlsCrt) == "file"
        } catch (err) {
            return undefined
        }
    })() == true ? 443 : ((value == 443 ? undefined : value) || 80)
})(toNumber(host?.port, {
    default: false
}));
/*if (Deno.dev == true) await (async function () {
    for await (const {
        key
    } of kv.list({
        prefix: []
    })) {
        console.log("db delete:", key);
        kv.delete(key)
    }
})();*/
let headers = new Headers({
    "Accept-Encoding": "br;q=1.0, gzip;q=0.8, *;q=0.1",
    /*"Content-Security-Policy": "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Origin-Agent-Cluster": "?1",
    "Referrer-Policy": "no-referrer",
    "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
    "X-Content-Type-Options": "nosniff",
    "X-DNS-Prefetch-Control": "off",
    "X-Download-Options": "noopen",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Permitted-Cross-Domain-Policies": "none",
    "X-XSS-Protection": "0"*/
}), hostname = toString(host?.hostname, {
    default: false
}), options = {
    port,
    onError: error
};
if (isString(hostname) == true) options["hostname"] = hostname
if (port == 443) {
    options["cert"] = tlsCrt;
    options["key"] = tlsKey
};
const oauth = (function () {
    try {
        return createHelpers((createGitHubOAuthConfig({
            redirectUri: `${port == 443 ? "https" : "http"}://${hostname || "localhost"}:${port}/login/callback`
        })))
    } catch (error) {
        return undefined
    }
})(), app = await (async function () {
    try {
        return (toFileUrl(resolve(await find("app")))).href
    } catch (err) {
        return undefined
    }
})(), directory = await (async function () {
    try {
        return (toFileUrl(resolve(await find("directory")))).href
    } catch (err) {
        return undefined
    }
})();
async function jsImport ({
    default: def
}) {
    try {
        let responseOptions = {
            headers
        };
        if (isNumber(this?.status, {
            onlyPositive: true
        }) == true) responseOptions["status"] = this?.status
        const access = (function () {
            try {
                return new URL(this.request.url).searchParams.get("access")
            } catch (error) {
                return undefined
            }
        })();
        if (isString(access) == true) setCookie(responseOptions.headers, {
            name: "access",
            value: access,
            maxAge: 604800
        })
        const authorizedAccess = (await (async () => {
            try {
                return (await kv.get(["PORTFOLIO", "access", getCookies(this.request.headers)?.["access"] || getCookies(responseOptions.headers)?.["access"]])).value
            } catch (error) {
                return false
            }
        })()) === true, data = await def.call({
            request: this?.request,
            params: this?.params,
            responseOptions,
            kv,
            oauth,
            authorizedAccess,
            DOMParser
        });
        return (data instanceof Response) == true ? data : [["type", "props"], ["head", "body"]].some(function (properties) {
            try {
                return properties.every(function (property) {
                    return property in data == true
                }) == true
            } catch (error) {
                return false
            }
        }) == true ? await (async () => {
            try {
                return await import(app).then(async ({
                    default: defApp
                }) => {
                    const appData = await defApp.call({
                        request: this?.request,
                        params: this?.params,
                        responseOptions,
                        kv,
                        oauth
                    }, data);
                    return (appData instanceof Response) == true ? appData : [["type", "props"], ["head", "body"]].some(function (properties) {
                        try {
                            return properties.every(function (property) {
                                return property in appData == true
                            }) == true
                        } catch (error) {
                            return false
                        }
                    }) == true ? send(`<!DOCTYPE html>${renderer(appData)}`, ".html", this?.status, responseOptions.headers) : send(appData, (function () {
                        const name = app.slice(app.lastIndexOf(separator) + 1);
                        return name.slice(name.lastIndexOf(".")).toLowerCase()
                    })(), this?.status, responseOptions.headers)
                })
            } catch (err) {
                return send(`<!DOCTYPE html>${renderer(data)}`, ".html", this?.status, responseOptions.headers)
            }
        })() : send(data, this?.extension, this?.status, responseOptions.headers)
    } catch (err) {
        return error.call(this, err)
    }
};
async function error(err) {
    console.error(err);
    const status = toNumber(err?.status, {
        default: false
    }) || 500;
    return await (async () => {
        try {
            const pathFind = await find(status), name = pathFind.slice(pathFind.lastIndexOf(separator) + 1), extension = name.slice(name.lastIndexOf(".")).toLowerCase();
            return await import(toFileUrl(resolve(pathFind))).then(jsImport.bind({
                request: this?.request,
                params: this?.params,
                extension,
                status,
                error: err
            }))
        } catch (err) {
            return undefined
        }
    })() || new Response(Deno.errors.keys.find(function (type) {
        return (err instanceof Deno.errors[type]) == true
    }) || (Deno.dev == true ? toString(err?.name || "", {
        default: false
    }) || toString(err || "", {
        default: false
    }) || null : null), {
        status/*,
        statusText: `${err}`*/
    })
};
Deno.serve(options, function (request) {
    try {
        const url = new URL(request.url), pathname = url.pathname.slice(url.pathname.lastIndexOf("/") + 1).toLowerCase(), source = (url.searchParams.has("source") == true || url.searchParams.has("src") == true) == true;
        return router(url, request.method).then(async function ([path, type, params]) {
            try {
                if ((source == true ? type == "file" : false) == true) {
                    const name = path.slice(path.lastIndexOf(separator) + 1), extension = name.slice(name.lastIndexOf(".")).toLowerCase(), pureName = name.slice(0, name.indexOf("."));
                    if (pureName == "index") {
                        path = path.slice(0, path.lastIndexOf(separator));
                        type = await entryType(path)
                    } else return Deno.open(path).then(function (file) {
                        return send(file.readable, extension)
                    })
                };
                if (type == "directory" && request.method == "GET") {
                    const name = directory.slice(directory.lastIndexOf(separator) + 1), extension = name.slice(name.lastIndexOf(".")).toLowerCase();
                    params[":path"] = path;
                    return await import(directory).then(jsImport.bind({
                        request,
                        params,
                        extension
                    }))
                } else throw undefined
            } catch (err) {
                try {
                    if (type == "file") {
                        const name = path.slice(path.lastIndexOf(separator) + 1), extension = name.slice(name.lastIndexOf(".")).toLowerCase();
                        return pathname != name.toLowerCase() && js.some(function (ext) {
                            return `.${ext}` == extension
                        }) == true ? import(toFileUrl(resolve(path))).then(jsImport.bind({
                            request,
                            params,
                            extension
                        })) : Deno.open(path).then(function (file) {
                            return send(file.readable, extension)
                        })
                    } else throw undefined
                } catch (err) {
                    return error.call({
                        request,
                        params
                    }, err || {
                        name: Deno.errors.NotFound.name,
                        status: 404
                    })
                }
            }
        }, error.bind({
            request
        }))
    } catch (err) {
        return error.call({
            request
        }, err)
    }
})