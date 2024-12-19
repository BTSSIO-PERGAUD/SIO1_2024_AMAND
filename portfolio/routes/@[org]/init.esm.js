import isString from "isto/is/string";
import isObject from "isto/is/object";
import isNumber from "isto/is/number";
import isArray from "isto/is/array";
import toString from "isto/to/string";
import {
    decodeBase64
} from "encoding/base64";
import resolve from "path/resolve";
import join from "path/join";
import relative from "path/relative";
async function getScore ({
    stargazers_count,
    forks_count,
    watchers_count,
    closed_issues_count,
    open_issues_count,
    contributors_url,
    archived,
    disabled
}) {
    const {
        externalContributions,
        totalContributors
    } = await (async function () {
        const contributors = await (await fetch(contributors_url)).json();
        return {
            externalContributions: contributors.reduce(function (acc, contrib) {
                return acc + contrib.contributions
            }, 0),
            totalContributors: contributors.length
        }
    })();
    return (
        (stargazers_count * 5) +
        (forks_count * 4) +
        (watchers_count * 3) +
        ((function (issuesClosed, issuesTotal) {
            return issuesTotal > 0 ? (issuesClosed / issuesTotal) * 100 : 0
        })(closed_issues_count || 0, open_issues_count + (closed_issues_count || 0)) * 2) -
        (open_issues_count * 2) +
        (externalContributions * 2) +
        ((totalContributors - externalContributions) * 1) -
        (archived ? 10 : 0) -
        (disabled ? 15 : 0)
    )
};
export default async function init (username) {
    username = toString(username);
    const isOwner = isString(username) != true;
    if (isOwner == true) username = Deno.env.get("GITHUB_OWNER")
    let user = await (async () => {
        try {
            const value = (await this.kv.get(["PORTFOLIO", "projects", username])).value;
            if (isObject(value) == true) return value
            else throw undefined
        } catch (error) {
            let value = Object.fromEntries(Object.entries(await (await fetch(`https://api.github.com/${isOwner == true ? "user" : "orgs"}/${username}`)).json()).filter(function ([key]) {
                return ["organizations_url", "id", "repos_url", "html_url", "avatar_url", "name"].includes(key) == true
            }));
            console.log("user object:", isOwner, value);
            value.avatar_url = await (async () => {
                let path = resolve(`./routes/previews/${toString(value.name).replace(/ /gmi, "")}`);
                try {
                    await Deno.mkdir(path, {
                        recursive: true
                    });
                    throw new Deno.errors.AlreadyExists()
                } catch (error) {
                    if ((error instanceof Deno.errors.AlreadyExists) == true) {
                        path = join(path, "avatar");
                        await Deno.writeFile(path, (await fetch(value.avatar_url)).body);
                        return new URL(relative("./routes", path), this.request.url).pathname
                    }
                    else throw error
                }
            })();
            //if (isOwner != true) username = value.name WARNING!
            console.log(["PORTFOLIO", "projects", username], value);
            await this.kv.set(["PORTFOLIO", "projects", username], value, {
                expireIn: 604800000
            });
            return value
        }
    })();
    const repos = (await Promise.all((await (async () => {
        try {
            const value = (await this.kv.get(["PORTFOLIO", "projects", username, "repos"])).value;
            if (isArray(value) == true) return value
            else throw undefined
        } catch (error) {
            const value = await Promise.all((await (await fetch(user.repos_url)).json()).map(async repo => {
                repo = Object.fromEntries(Object.entries(repo).filter(function ([key]) {
                    return ["name", "stargazers_count", "forks_count", "watchers_count", "closed_issues_count", "open_issues_count", "contributors_url", "archived", "disabled", "html_url", "description", "contents_url"].includes(key) == true
                }));
                repo.previews = (await (async () => {
                    try {
                        const value = (await this.kv.get(["PORTFOLIO", "projects", username, repo.name, "previews"])).value;
                        if (isArray(value) == true) return value
                        else throw undefined
                    } catch (error) {
                        try {
                            const document = ((new this.DOMParser()).parseFromString(new TextDecoder().decode(decodeBase64((await (await fetch((toString(repo.contents_url)).replace("{+path}", "README.md"))).json()).content)), "text/html")), value = await Promise.all([...document.querySelectorAll("#readme-body-preview img")].map(async ({
                                attributes
                            }) => {
                                let path = resolve(`./routes/previews/${toString(user.name).replace(/ /gmi, "")}/${repo.name}`);
                                try {
                                    await Deno.mkdir(path, {
                                        recursive: true
                                    });
                                    throw new Deno.errors.AlreadyExists()
                                } catch (error) {
                                    if ((error instanceof Deno.errors.AlreadyExists) == true) {
                                        const {
                                            alt,
                                            name,
                                            download_url
                                        } = Object.assign({
                                            alt: attributes.getNamedItem("alt").value
                                        }, Object.fromEntries(Object.entries((await (await fetch(new URL(attributes.getNamedItem("src").value, (toString(repo.contents_url)).replace("{+path}", "")))).json())).filter(function ([key]) {
                                            return ["name", "download_url"].includes(key) == true
                                        })));
                                        path = join(path, name);
                                        await Deno.writeFile(path, (await fetch(download_url)).body);
                                        return {
                                            alt,
                                            src: new URL(relative("./routes", path), this.request.url).pathname
                                        }
                                    } else throw error
                                }
                            })), name = document.querySelector("#readme-title")?.textContent;
                            if (isString(name) == true) repo.display_name = name
                            await this.kv.set(["PORTFOLIO", "projects", username, repo.name, "previews"], value, {
                                expireIn: 604800000
                            });
                            return value
                        } catch (err) {
                            return undefined
                        }
                    }
                })());
                if (isString(repo?.display_name) != true) repo.display_name = repo.name
                repo.score = await (async () => {
                    try {
                        const value = (await this.kv.get(["PORTFOLIO", "projects", username, repo.name, "score"])).value;
                        if (isNumber(value, {
                            onlyPositive: true
                        }) == true) return value
                        else throw undefined
                    } catch (error) {
                        const value = await getScore(repo);
                        console.log(`${repo.name}:`, value);
                        await this.kv.set(["PORTFOLIO", "projects", username, repo.name, "score"], value, {
                            expireIn: 604800000
                        });
                        return value
                    }
                })();
                return repo
            }));
            console.log(["PORTFOLIO", "projects", username, "repos"]);
            await this.kv.set(["PORTFOLIO", "projects", username, "repos"], value, {
                expireIn: 604800000
            });
            return value
        }
    })()))).sort(function (a, b) {
        return b.score - a.score
    });
    user.repos = repos.slice(0, 5);
    user.score = repos.reduce(function (acc, repo) {
        return acc + repo.score
    }, 0);
    return user
}