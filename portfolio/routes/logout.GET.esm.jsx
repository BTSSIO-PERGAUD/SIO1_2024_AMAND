export default async function logout () {
    if (typeof (this?.oauth) != "undefined") return await this.oauth.signOut(this.request)
    else throw {
        name: Deno.errors.NotSupported.name,
        status: 501
    }
}