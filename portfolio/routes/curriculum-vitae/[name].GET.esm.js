export default async function access () {
    throw {
        name: Deno.errors.PermissionDenied.name,
        status: 401
    }
    if (await this.oauth.getSessionId(this.request) != undefined) {
        await this.kv.set(["PORTFOLIO", "cv", this.params.name], true, {
            expireIn: 604800000
        });
        let redirect = new URL(this.request.url);
        redirect.pathname = "/";
        return Response.redirect(redirect)
    } else throw {
        name: Deno.errors.PermissionDenied.name,
        status: 401
    }
}