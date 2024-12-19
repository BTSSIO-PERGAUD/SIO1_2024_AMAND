export default function technologyWatch () {
    return (
        <div className="container" style="background-color: transparent;padding: 0;flex-direction: column">
            <div className="cards">
                {[
                    ["DenoJS", "/technology-watch/denojs.svg", "https://deno.com"],
                    ["NodeJS", "/technology-watch/nodejs.svg", "https://nodejs.org"],
                    ["Bun", "/technology-watch/bun.svg", "https://bun.sh"],
                    ["Rust", "/technology-watch/rust.svg", "https://www.rust-lang.org"],
                    ["Zig", "/technology-watch/zig.svg", "https://ziglang.org"],
                    ["Dart", "/technology-watch/dart.svg", "https://dart.dev"],
                    ["Flutter", "/technology-watch/flutter.svg", "https://flutter.dev"],
                    ["WebAssembly (WASM)", "/technology-watch/wasm.svg", "https://webassembly.org"],
                    ["Boa", "/technology-watch/boa.svg", "https://github.com/boa-dev/boa"],
                    ["v86", undefined, "https://github.com/copy/v86"],
                    ["WebGPU", "/technology-watch/webgpu.svg", "https://github.com/gpuweb/gpuweb"],
                    ["Proton", "/technology-watch/proton.png", "https://github.com/ValveSoftware/Proton"],
                    ["Bevy", "/technology-watch/bevy.svg", "https://bevyengine.org"],
                    ["Flame", "/technology-watch/flame.png", "https://flame-engine.org"],
                    ["Fyrox", "/technology-watch/fyrox.png", "https://fyrox.rs"],
                    ["HTML / CSS / JavaScript", "/technology-watch/html.svg", "https://developer.mozilla.org"],
                    ["TailWindCSS", "/technology-watch/tailwindcss.svg", "https://tailwindcss.com"],
                    ["DaisyUi", "/technology-watch/daisyui.svg", "https://daisyui.com"],
                    ["Babylon.js", "/technology-watch/babylonjs.svg", "https://www.babylonjs.com"],
                    ["Fresh", "/technology-watch/fresh.svg", "https://fresh.deno.dev"],
                    ["Hono", "/technology-watch/hono.png", "https://hono.dev"],
                    ["Fastify", "/technology-watch/fastify.svg", "https://fastify.dev"],
                    ["Puter", "/technology-watch/puter.png", "https://puter.com"],
                    ["Better SQLite", "/technology-watch/sqlite.svg", "https://github.com/WiseLibs/better-sqlite3"],
                    ["Electron.js", "/technology-watch/electronjs.svg", "https://www.electronjs.org"],
                    ["Neutralino.js", "/technology-watch/neutralinojs.png", "https://neutralino.js.org"],
                    ["WebUI", "/technology-watch/webui.svg", "https://webui.me"],
                    ["Expo Go", "/technology-watch/expo_go.svg", "https://expo.dev"],
                    ["Socket Supply","/technology-watch/socket_supply.svg", "https://socketsupply.co"],
                    ["Ventoy", "/technology-watch/ventoy.png", "https://www.ventoy.net"],
                    ["ReactOS", "/technology-watch/reactos.png", "https://reactos.org"],
                    ["Gaming / Modding", "/technology-watch/gaming_modding.jpg", "https://www.moddb.com"],
                    ["Open Source", "/technology-watch/open_source.jpg", "https://opensource.org"]
                ].map(function ([name, picture, link]) {
                    return (
                        <div className="card">
                            <a href={link} target="_blank">
                                <div>
                                    {typeof (picture) == "string" ? (<img src={picture} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />) : undefined}
                                </div>
                                <div className="card-content">
                                    <div>
                                        <h1>{name}</h1>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}