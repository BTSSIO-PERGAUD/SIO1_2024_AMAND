export default async function login () {
    return await this.oauth.signIn(this.request)
}