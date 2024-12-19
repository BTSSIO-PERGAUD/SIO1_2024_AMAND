import resolve from "path/resolve";
export default async function curriculumVitae () {
    console.log("curriculumVitae!");
    return new Response((await Deno.open(resolve(`./assets${this.authorizedAccess == true ? "/private" : ""}/pdf/AMAND Alexandre - CV.pdf`))).readable, Object.assign(this.responseOptions, {
        headers: Object.assign(Object.fromEntries(this.responseOptions.headers.entries()), {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=\"AMAND Alexandre - CV.pdf\"`
        })
    }))
}