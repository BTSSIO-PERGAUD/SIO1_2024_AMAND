export default function workExperience () {
    return (
        <div className="container" style="background-color: transparent;padding: 0;flex-direction: column">
            <p>P.F.M.P. (ou Stage) = <a className="link" href="https://eduscol.education.fr/666/periodes-de-formation-en-milieu-professionnel-pfmp" target="_blank">Période de Formation en Milieu Professionnel</a></p>
            <div className="cards">
                {[
                    ["PFL Events - Bavans 25550", "2023 - 13/11 > 22/12", "/work-experience/pfl_events.png", "https://maps.app.goo.gl/cjeDSkxnrjiLgyCE6", "https://slides.com/alexandreamand/rapport-de-stage-pfl-events"],
                    ["Darty - Montbéliard 25200", "2023 - 29/05 > 30/06", "/work-experience/darty.svg", "https://maps.app.goo.gl/oNNspawrLDMmex8HA", "https://amandalexandrepro.github.io/Rapport-PFMP-Darty"],
                    ["Électro dépôt - Exincourt 25400", "2023 - 03/01 > 04/02", "/work-experience/electro_depot.svg", "https://goo.gl/maps/MhSY1sWTM7ZzvGo8A", "https://slides.com/alexandreamand/rapport_stage_electro_depot"]
                ].map(function ([name, duration, picture, link, pfmp]) {
                    return (
                        <div className="card">
                            <a href={link} target="_blank">
                                <div>
                                    {typeof (picture) == "string" ? (<img src={picture} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />) : undefined}
                                </div>
                                <div className="card-content">
                                    <div>
                                        <h1>{name}</h1>
                                        <div style="text-align: center;margin: .67em 0">
                                            <a className="button" href={pfmp} target="_blank">{duration}</a>
                                        </div>
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