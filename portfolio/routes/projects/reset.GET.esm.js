export default async function projectsReset () {
    if (typeof (this?.oauth) != "undefined") {
        if (await this.oauth.getSessionId(this.request) != undefined) {
            for await (const {
                key
            } of this.kv.list({
                prefix: ["PORTFOLIO", "projects"]
            })) {
                this.kv.delete(key)
            };
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