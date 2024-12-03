export default async function login () {
    throw {
        name: Deno.errors.PermissionDenied.name,
        status: 401
    }
    return await this.oauth.signIn(this.request)
}