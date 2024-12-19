export default async function login () {
    if (typeof (this?.oauth) != "undefined") return await this.oauth.signIn(this.request)
    else throw {
        name: Deno.errors.NotSupported.name,
        status: 501
    }
}