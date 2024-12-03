import toString from "isto/to/string";
export default function app (data) {
    const title = (toString(data?.title, {
        default: true
    }) || "AMAND Alexandre"), description = (toString(data?.description, {
        default: true
    }) || `Étudiant de ${Math.abs(new Date(Date.now() - new Date("09/30/2003").getTime()).getUTCFullYear() - 1970)} ans en Première année de BTS Services Informatiques aux Organisations`);
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
                <meta property="og:image" content="/favicon.ico"></meta>
                <meta property="twitter:card" content="summary"></meta>
                <meta property="twitter:title" content={title}></meta>
                <meta property="twitter:description" content={description}></meta>
                <meta property="twitter:image" content="/favicon.ico"></meta>
                <meta property="theme-color" content="#00BF66"></meta>
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                {data?.head}
            </head>
            <body>
                {data?.body || data}
            </body>
        </html>
    )
}