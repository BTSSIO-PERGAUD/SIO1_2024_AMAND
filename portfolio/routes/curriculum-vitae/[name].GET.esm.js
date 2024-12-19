export default async function curriculumVitaeAccess () {
    console.log("curriculumVitaeAccess!");
    if (typeof (this?.oauth) != "undefined") {
        if (await this.oauth.getSessionId(this.request) != undefined) {
            await this.kv.set(["PORTFOLIO", "access", this.params.name], true, {
                expireIn: 604800000
            });
            let redirect = new URL(this.request.url);
            redirect.pathname = "/";
            return Response.redirect(redirect)
        } else throw {
            name: Deno.errors.PermissionDenied.name,
            status: 401
        }
    } else throw {
        name: Deno.errors.NotSupported.name,
        status: 501
    }
}