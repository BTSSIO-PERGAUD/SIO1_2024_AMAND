import init from "./init.esm.js";
import isString from "isto/is/string";
import isArray from "isto/is/array";
import toString from "isto/to/string";
import repository from "./[repo].GET.esm.jsx";
async function initOrganisations () {
    try {
        const value = (await this.kv.get(["PORTFOLIO", "projects", "organisations"])).value;
        if (isArray(value) == true) return value
        else throw undefined
    } catch (error) {
        const value = (await (await fetch((await init.call(this)).organizations_url)).json()).map(function ({
            id
        }) {
            return id
        });
        console.log(["PORTFOLIO", "projects", "organisations"]);
        await this.kv.set(["PORTFOLIO", "projects", "organisations"], value, {
            expireIn: 604800000
        });
        return value
    }
};
export default async function organisation () {
    let {
        pathname
    } = new URL(this.request.url);
    pathname = pathname.toLowerCase();
    return await (async () => {
        try {
            const normalizeOrgParam = (toString(this?.params?.org)).toLowerCase(), user = (isString(this?.params?.org) == true ? await (async () => {
                for (const id of await initOrganisations.call(this)) {
                    const value = await init.call(this, id);
                    if (normalizeOrgParam == (toString(value.name)).toLowerCase()) return value
                }
            })() : await init.call(this));
            if (isArray(user?.repos) == true) return (pathname.startsWith("/projects") == true || pathname.startsWith(`/@${user.name.toLowerCase()}`) == true ? (function (value) {
                return (
                    <div className="container" style="background-color: transparent;padding: 0">
                        <div className="picture-and-name" style="margin-bottom: 2rem">
                            <a href={user.html_url} target="_blank"><img src={user.avatar_url} alt={`Avatar de ${user.name}`} style="max-width: 275px;width: 275px" /></a>
                            <h1>{user.name}</h1>
                        </div>
                        <div className="cards">{value}</div>
                    </div>
                )
            })(await Promise.all(user.repos.map(async ({
                name
            }) => {
                return await repository.call(Object.assign(this, {
                    params: Object.assign(this.params, {
                        repo: name,
                        user
                    })
                }))
            }))) : (await Promise.all([undefined, ...(await initOrganisations.call(this))].map(async (id) => {
                const user = await init.call(this, id);
                return (
                    <div className="container" style="background-color: transparent;padding: 0;flex-direction: column;">
                        <div className="picture-and-name" style="margin-bottom: 2rem">
                            <a href={user.html_url} target="_blank"><img src={user.avatar_url} alt={`Avatar de ${user.name}`} style="max-width: 275px;width: 275px" /></a>
                            <h1>{user.name}</h1>
                        </div>
                        <div className="cards">{await Promise.all(user.repos.map(async ({
                            name
                        }) => {
                            return await repository.call(Object.assign(this, {
                                params: Object.assign(this.params, {
                                    repo: name,
                                    user
                                })
                            }))
                        }))}</div>
                    </div>
                )
            }))))
            else throw undefined
        } catch (error) {
            console.error(error);
            throw {
                name: Deno.errors.NotFound.name,
                status: 404
            }
        }
    })()
}