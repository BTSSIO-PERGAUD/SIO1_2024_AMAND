import toString from "isto/to/string";
export default function error () {
    const status = this?.status || 500;
    return (
        <div className="container" style="flex-direction: column;-webkit-justify-content: center;-webkit-align-items: center;-webkit-box-align: center">
            <h1>Erreur {status} !</h1>
            <p>{Deno.errors.keys.find(type => {
                return (this?.error instanceof Deno.errors[type]) == true
            }) || toString(this?.error?.name || "", {
                default: false
            }) || toString(this?.error || "", {
                default: false
            }) || (() => {
                try {
                    return JSON.stringify(this?.error) || this?.error
                } catch (error) {
                    return this?.error
                }
            })()}</p>
        </div>
    )
}