import toArray from "isto/to/array";
import init from "./init.esm.js";
import toString from "isto/to/string";
import isArray from "isto/is/array";
import typeByExtension from "media-types/type-by-extension";
import toObject from "isto/to/object";
export default async function repository () {
    let {
        pathname
    } = new URL(this.request.url);
    pathname = pathname.toLowerCase();
    return await (async () => {
        try {
            const normalizeRepoParam = (toString(this?.params?.repo)).toLowerCase(), user = (toObject(this?.params?.user, {
                default: false
            }) || await init.call(this, this?.params?.org)), repo = user.repos.find(({
                name
            }) => {
                return normalizeRepoParam == (toString(name)).toLowerCase()
            });
            if (repo) return (value => {
                return pathname.startsWith(`/${repo.name.toLowerCase()}`) == true || pathname.startsWith(`/@${user.name.toLowerCase()}/${repo.name.toLowerCase()}`) == true ? (
                    <div class="pure-g">
                        <div class="pure-u-1-3">
                            <img src={user.avatar_url} alt={`Avatar de ${user.name}`} />
                            <h3>{user.name}</h3>
                        </div>
                        <div class="pure-u-2-3">{value}</div>
                    </div>
                ) : value
            })((
                <div className="card">
                    <a href={repo.html_url} target="_blank">
                        {isArray(repo.previews) == true ? (
                                <div>
                                    <img src={repo.previews[0].src} alt={repo.previews[0].alt} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />
                                </div>
                        ) : undefined}
                        <div className="card-content">
                            <div>
                                <h1>{repo.display_name}</h1>
                                <p>{repo.description}</p>
                            </div>
                        </div>
                    </a>
                </div>
            ))
            else throw undefined
        } catch (error) {
            console.error(error);
            /*throw {
                name: Deno.errors.NotFound.name,
                status: 404
            }*/
        }
    })()
}