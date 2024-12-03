import resolve from "path/resolve";
export default async function curriculumVitae () {
    throw {
        name: Deno.errors.PermissionDenied.name,
        status: 401
    }
    const {
        searchParams
    } = new URL(this.request.url);
    return new Response((await Deno.open(resolve(`./${Deno.env.get("CURRICULUM_VITAE")}${(await (async () => {
        try {
            return (await this.kv.get(["PORTFOLIO", "cv", searchParams.get("access")]))?.value
        } catch (error) {
            return false
        }
    })()) != true ? ".public" : ""}.pdf`))).readable, Object.assign(this.responseOptions, {
        headers: Object.assign(this.responseOptions.headers, {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename=\"${Deno.env.get("CURRICULUM_VITAE")}.pdf\"`
        })
    }))
}