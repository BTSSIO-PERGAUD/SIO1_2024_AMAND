export default async function logout () {
    return await this.oauth.signOut(this.request)
}