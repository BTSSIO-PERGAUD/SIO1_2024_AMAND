/*import resolve from "path/resolve";
import basename from "path/basename";
import join from "path/join";
import isArray from "isto/is/array";
import relative from "path/relative";
import isString from "isto/is/string";
import separator from "path/utils/separator.esm.js";
export default async function certifications () {
    const url = this.request.url;
    return (
        <div className="container" style="background-color: transparent;padding: 0;flex-direction: column">
            <div className="cards">{((await (async function () {
                let result = [], data = {};
                try {
                    const root = resolve("./routes/certifications");
                    await (async function recursive (path) {
                        let dirs = [];
                        for await (let {
                            isDirectory,
                            isFile,
                            isSymlink,
                            name
                        } of Deno.readDir(path)) {
                            if (isSymlink == true) {
                                const pathSymlink = join(path, name);
                                ({
                                    isDirectory,
                                    isFile,
                                    name
                                } = Object.assign({
                                    name: basename(pathSymlink)
                                }, Object.fromEntries(Object.entries((await Deno.stat(pathSymlink))).filter(function ([key]) {
                                    return ["isDirectory", "isFile"].includes(key) == true
                                }))))
                            };
                            const fullPath = join(path, name), normalizeName = name.toLowerCase(), oldData = JSON.parse(JSON.stringify(data));
                            console.log(name, data);
                            if (isDirectory == true) dirs.push(fullPath)
                            else if (isFile == true) {
                                if (normalizeName == "actor.txt") data["actor"] = (await Deno.readTextFile(fullPath)).trim()
                                else {
                                    if (normalizeName == "service.txt") data["service"] = (await Deno.readTextFile(fullPath)).trim()
                                    else if (normalizeName == "preview.png") data["preview"] = new URL(relative(root, fullPath), url)
                                    else {
                                        if (isArray(data["certificates"]) != true) data["certificates"] = [];
                                        (data["certificates"]).push(new URL(relative(root, fullPath), url))
                                    };
                                    if ((data != oldData ? isString(data?.["path"]) != true : false) == true) data["path"] = path
                                }
                            };
                            if (path.startsWith(data?.["path"]) != true) {
                                console.log("reset:", path);
                                result.push(data);
                                data = {
                                    path
                                }
                            };
                        };
                        for await (const dir of dirs) {
                            await recursive(dir)
                        }
                    })(root);
                    console.log("end:", result);
                    return result
                } catch (error) {
                    return undefined
                }
            })()).filter(function (value) {
                console.log("certif:", value);
                return isString(value?.actor) == true && isString(value?.service) == true && isString(value?.preview) == true && isArray(value?.certificates) == true
            })).map(function ({
                actor,
                service,
                preview,
                certificates
            }) {
                console.log({
                    actor,
                    service,
                    preview,
                    certificates
                });
                return (
                    <div className="card">
                        <div className="card-content">
                            <div>
                                <img src={preview} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />
                            </div>
                            <div>
                                <h1>{service} par {actor}</h1>
                            </div>
                        </div>
                    </div>
                )
            })}</div>
        </div>
    )
}*/
export default function certifications() {
    return (
        <div className="container" style="background-color: transparent;padding: 0;flex-direction: column">
            <div className="cards">
                {[
                    ["MOOC SecNum Académie par L'ANSSI", "/certifications/mooc/anssi/secnumacademie/preview.png", "https://secnumacademie.gouv.fr", [
                        [
                            "Voir l'attestation",
                            "/certifications/mooc/anssi/secnumacademie/1.pdf"
                        ]
                    ]],
                    ["MOOC Atelier RGPD par La CNIL", "/certifications/mooc/cnil/atelierrgpd/preview.png", "https://atelier-rgpd.cnil.fr", [
                        [
                            "Module 1",
                            "/certifications/mooc/cnil/atelierrgpd/1.pdf"
                        ],
                        [
                            "Module 2",
                            "/certifications/mooc/cnil/atelierrgpd/2.pdf"
                        ],
                        [
                            "Module 3",
                            "/certifications/mooc/cnil/atelierrgpd/3.pdf"
                        ],
                        [
                            "Module 4",
                            "/certifications/mooc/cnil/atelierrgpd/4.pdf"
                        ],
                        [
                            "Module 5",
                            "/certifications/mooc/cnil/atelierrgpd/5.pdf"
                        ]
                    ]],
                    ["Attestation PIX", "/certifications/pix/preview.svg", "https://pix.fr", [
                        [
                            "Voir l'attestation",
                            "/certifications/pix/attestation-pix-20240318.pdf"
                        ]
                    ]]
                ].map(function ([name, picture, link, certificates]) {
                    return (
                        <div className="card">
                            <a href={link} target="_blank">
                                <div>
                                    {typeof (picture) == "string" ? (<img src={picture} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />) : undefined}
                                </div>
                                <div className="card-content">
                                    <div>
                                        <h1>{name}</h1>
                                        <div style="margin: .67em 0">
                                            {certificates.map(function ([label, link]) {
                                                return (<a className="button" href={link} target="_blank">{label}</a>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}