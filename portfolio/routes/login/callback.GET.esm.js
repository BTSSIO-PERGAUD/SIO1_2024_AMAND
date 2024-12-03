import toNumber from "isto/to/number";
import logout from "../logout.GET.esm.jsx";
export default async function callback () {
    try {
        const {
            response,
            tokens: {
                accessToken
            }
        } = await this.oauth.handleCallback(this.request);
        if (toNumber((await (await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })).json())?.id, {
            default: false
        }) === toNumber(Deno.env.get("GITHUB_OWNER"))) return response
        else throw undefined
    } catch (error) {
        return await logout.call(this)
    }
}