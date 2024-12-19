import isString from "isto/is/string";
import toString from "isto/to/string";
import {
    regSeparator
} from "path/utils/separator.esm.js";
import relative from "path/relative";
import resolve from "path/resolve";
export default async function directory () {
    const path = resolve(this.params[":path"]);
    if (isString(path) == true) {
        let displayPath = (toString(relative(resolve("./routes"), path), {
            default: false
        }));
        displayPath = (isString(displayPath) == true ? `/${displayPath.replace(new RegExp(regSeparator, "g"), "/")}` : "/");
        const pathname = new URL(this.request.url).pathname.replace(/\/$/, "");
        let items = (pathname.endsWith("/") != true ? `${pathname}/` : pathname).lastIndexOf("/") > 0 ? [<li style={"list-style-type: square;"}><a href={`${toString(pathname.slice(0, pathname.lastIndexOf("/")), {
            default: false
        }) || "/"}?src`}>../</a></li>] : [];
        for await (const {
            isDirectory,
            name: entryName
        } of Deno.readDir(path)) {
            items.push(<li style={`list-style-type: ${isDirectory == true ? "square" : "circle"};`}><a href={`${pathname}/${entryName}${isDirectory == true ? "?src" : ""}`}>{entryName}</a></li>)
        };
        return (
            <>
                <h1>{displayPath}</h1>
                <ul>{items}</ul>
            </>
        )
    } else throw undefined
}