/*This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  This Source Code Form is "Incompatible With Secondary Licenses", as
  defined by the Mozilla Public License, v. 2.0.*/
import isObject from "isto/is/object";
import isPort from "isto/is/port";
import isString from "isto/is/string";
import isBoolean from "isto/is/boolean";
/**
 * Unification of Deno's https://docs.deno.com/api/deno/~/Deno.ServeUnixOptions, https://docs.deno.com/api/deno/~/Deno.ServeTcpOptions, https://docs.deno.com/api/deno/~/Deno.TlsCertifiedKeyPem and https://docs.deno.com/api/deno/~/Deno.ServeInit interfaces.
 * @typedef {Object} ServeOptions
 * @property {"unix" | "tcp"} [transport] The transport to use.
 * @property {String} [path] The unix domain socket path to listen on.
 * @property {Number} [port=8000] The port to listen on.
 * 
 * Set to 0 to listen on any available port.
 * @property {String} [hostname="0.0.0.0"] A literal IP address or host name that can be resolved to an IP address.
 * 
 * Note about 0.0.0.0 While listening 0.0.0.0 works on all platforms, the browsers on Windows don't work with the address 0.0.0.0. You should show the message like server running on localhost:8080 instead of server running on 0.0.0.0:8080 if your program supports Windows.
 * @property {Boolean} [reusePort] Sets SO_REUSEPORT on POSIX systems.
 * @property {String} [keyFormat="pem"] The format of this key material, which must be PEM.
 * @property {String} [key] Private key in PEM format. RSA, EC, and PKCS8-format keys are supported.
 * @property {String} [cert] Certificate chain in PEM format.
 * @property {Deno.ServeHandler} [handler] https://docs.deno.com/api/deno/~/Deno.ServeHandler
 */
/**
 * @module ready-to-listen
 * @name ready-to-listen
 * @description Find the best options for https://docs.deno.com/api/deno/~/Deno.serve
 * @license MPL-2.0
 * @author AMAND Alexandre <amand.alexandre.pro@gmail.com>
 * @function readyToListen
 * @async
 * @param {ServeOptions} options See {@link ServeOptions}
 * @returns {ServeOptions}
 * @example
 * // ECMAScript
 * import readyToListen from "ready-to-listen";
 * // CommonJS
 * const readyToListen = require("ready-to-listen");
 * // Declarations
 * readyToListen({
 *     port: 1337
 * }) // Return { port: 80, hostname: "0.0.0.0", reusePort: false, keyFormat: "pem" }
 */
export default function readyToListen (options) {
    if (isObject(options) != true) options = {}
    if (isPort(options?.port) != true) options.port = 8000
    if (isString(options?.hostname) != true) options.hostname = "0.0.0.0"
    if (isBoolean(options?.reusePort) != true) options.reusePort = false
    if (isString(options?.keyFormat) != true) options.keyFormat = "pem"
    try {
        Deno.listen(options).close();
        return options
    } catch (error) {
        if ((error instanceof Deno.errors.AddrInUse) == true) {
            for (let port = 1; port <= 65535; port++) {
                try {
                    let tempOptions = options;
                    tempOptions["port"] = port;
                    Deno.listen(tempOptions).close();
                    options = tempOptions;
                    break
                } catch (error) {
                    if ((error instanceof Deno.errors.AddrInUse) != true) break
                }
            };
            return options
        } else return options
    }
}