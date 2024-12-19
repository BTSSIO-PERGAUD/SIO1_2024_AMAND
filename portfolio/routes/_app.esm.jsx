import toString from "isto/to/string";
export default function app (data) {
    const title = (toString(data?.title, {
        default: true
    }) || "AMAND Alexandre"), description = (toString(data?.description, {
        default: true
    }) || `Étudiant de ${Math.abs(new Date(Date.now() - new Date("09/30/2003").getTime()).getUTCFullYear() - 1970)} ans en Première année de Brevet de Technicien Supérieur Services Informatiques aux Organisations`), {
        pathname
    } = (() => {
        try {
            return new URL(this?.request?.url)
        } catch (error) {
            return {}
        }
    })();
    return (
        <html>
            <head>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <title>{title}</title>
                <meta name="description" content={description}></meta>
                <meta property="og:type" content="website"></meta>
                <meta property="og:title" content={title}></meta>
                <meta property="og:description" content={description}></meta>
                <meta property="og:image" content="/favicon.png"></meta>
                <meta property="twitter:card" content="summary"></meta>
                <meta property="twitter:title" content={title}></meta>
                <meta property="twitter:description" content={description}></meta>
                <meta property="twitter:image" content="/favicon.png"></meta>
                <meta property="theme-color" content="#00BF66"></meta>
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                <link rel="stylesheet" href="/_app.css" />
                {data?.head}
                <link rel="stylesheet" href="/purecss/base-min.css" />
            </head>
            <body>
                <div className="navbar">
                    <ul className="navbar-items">
                        <li className={`navbar-item${pathname == "/" ? " navbar-item-selected" : ""}`}>
                            <a className="button" href={pathname != "/" ? "/" : undefined}>Accueil</a>
                        </li>
                        {Object.entries({
                                "/about-me": "À propos de moi",
                                "/projects": "Projets",
                                "/certifications": "Certifications",
                                "/work-experience": "Expérience professionnelle",
                                "/technology-watch": "Veille technologique",
                                "/passions": "Passions",
                                "/contact": "Contact"
                        }).map(function ([route, label]) {
                            return (<li className={`navbar-item${pathname == route ? " navbar-item-selected" : ""}`}>
                                <a className="button" href={pathname != route ? route : undefined}>{label}</a>
                            </li>)
                        })}
                    </ul>
                </div>
                {data?.body || data}
                <div className="footer">
                    <p><a href="https://www.mozilla.org/en-US/MPL/2.0" target="_blank">🄯</a> <a href="https://github.com/AmandAlexandrePro/portfolio" target="_blank">PortFolio</a> 2024{new Date().getFullYear() != 2024 ? ` - ${new Date().getFullYear()}` : ""}<br/>
                     et 🎨 avec ❤ par <a href="https://github.com/AmandAlexandrePro" target="_blank">AMAND Alexandre</a></p>
                </div>
                <script src="/browser-color-scheme.js"></script>
            </body>
        </html>
    )
}