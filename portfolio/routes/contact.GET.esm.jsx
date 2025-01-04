import isString from "isto/is/string";
const validEMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, to = Deno.env.get("SMTP_SEND_TO"), from = Deno.env.get("SMTP_SEND_FROM");
export default async function contact () {
    if (typeof (this?.smtp) != "undefined" && [to, from].every(function (value) {
        return validEMail.test(value) == true
    }) == true) {
        const {
            searchParams
        } = new URL(this.request.url), name = searchParams.get("name"), email = searchParams.get("email"), subject = searchParams.get("subject"), message = searchParams.get("message"), url = (function () {
            try {
                return new URL(searchParams.get("url"))
            } catch (error) {
                return undefined
            }
        })();
        if (validEMail.test(email) == true && [name, subject, message].every(function (param) {
            return isString(param) == true
        }) == true && (url instanceof URL) == true) {
            await this.smtp.send({
                to,
                cc: [email],
                from,
                subject: `${name} - ${subject}`,
                content: "auto",
                html: message,
                internalTag: "portfolio",
                priority: "high"
            });
            return Response.redirect(url)
        } else return (
            <div className="container">
                <form style="display: flex;flex-direction: column;flex-wrap: nowrap;align-items: center;" name="contact" action="/contact" method="GET" onsubmit={`(function () {
                    this.url.value = document.location.href;
                    return true
                }).call(this)`}>
                    <div className="form-items">
                        <label htmlFor="name">Nom</label>
                        <input type="text" name="name" id="name" placeholder="NOM Prénom" maxlength="256" required />
                    </div>
                    <div className="form-items">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="nom.prenom@exemple.com" required />
                    </div>
                    <div className="form-items">
                        <label htmlFor="subject">Objet</label>
                        <input type="text" name="subject" id="subject" placeholder="C'est à quel sujet ?" maxlength="256" required />
                    </div>
                    <div className="form-items">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" id="message" cols="22" rows="3" placeholder={`Bonjour.\nBlaBla...\nSincères salutations.`} maxlength="2048" required></textarea>
                    </div>
                    <input type="hidden" name="url" id="url" />
                    <button type="submit">Soumettre</button>
                </form>
            </div>
        )
    } else throw {
        name: Deno.errors.NotSupported.name,
        status: 501
    }
}