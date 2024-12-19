import resolve from "path/resolve";
import toArray from "isto/to/array";
import renderer from "preact-render-to-string";
import app from "../_app.esm.jsx";
export default async function curriculumVitaeHTML () {
    console.log("curriculumVitaeHTML!");
    let body = await Deno.readTextFile(resolve("./assets/html/CV - AMAND Alexandre.html"));
    const informations = toArray(await Deno.readTextFile(resolve(`./assets${this.authorizedAccess == true ? "/private" : ""}/json/curriculum-vitae.json`)));
    for (let index = 0; index < informations.length; index++) {
        // Non optimiser !
        const {
            label,
            link
        } = informations[index];
        body = body.replace(new RegExp(`#${index}#`, "g"), label).replace(new RegExp(`#${index}_HREF#`, "g"), link)
    };
    return new Response(`<!DOCTYPE html>${renderer(app.call(this))}`.replace(`<div class="footer">`, `<iframe style="height: 100%;margin: 2rem 5rem 0;border: none" srcdoc='${body.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}'></iframe><div class="footer">`), Object.assign(this.responseOptions, {
        headers: Object.assign(Object.fromEntries(this.responseOptions.headers.entries()), {
            "Content-Type": "text/html"
        })
    }))
}