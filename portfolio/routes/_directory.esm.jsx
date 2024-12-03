import isString from "isto/is/string";
import toString from "isto/to/string";
import separator from "path/utils/separator.esm.js";
export default async function directory ({
    ":path": path
}) {
    if (isString(path) == true) {
        const name = path.slice(path.lastIndexOf(separator) + 1), pathname = new URL(this.url).pathname.replace(/\/$/, "");
        let items = (pathname.endsWith("/") != true ? `${pathname}/` : pathname).lastIndexOf("/") > 0 ? [<li style={"list-style-type: square;"}><a href={toString(pathname.slice(0, pathname.lastIndexOf("/")), {
            default: false
        }) || "/"}>../</a></li>] : [];
        for await (const {
            isDirectory,
            name: entryName
        } of Deno.readDir(path)) {
            items.push(<li style={`list-style-type: ${isDirectory == true ? "square" : "circle"};`}><a href={`${pathname}/${entryName}`}>{entryName}</a></li>)
        };
        return (
            <>
                <h1>{name}</h1>
                <ul>{items}</ul>
            </>
        )
    } else throw undefined
}