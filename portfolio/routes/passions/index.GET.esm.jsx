export default function passions () {
    return (
        <div className="container" style="background-color: transparent;padding: 0;flex-direction: column">
            <div className="cards">
                {[
                    ["Informatique", "/passions/informatique.png", "Optimisation"],
                    ["Programmation", "/passions/programmation.png", "Serveur Web"],
                    ["Dessin numérique", "/passions/dessin_numerique.svg", "Haru Nonaka"],
                    ["Création de Contenu Numérique", "/passions/creation_contenu_numerique.png", "Let's Play"],
                    ["Jeux-Vidéos", "/passions/jeux_videos.jpg", "DayZ"],
                    ["Modding", "/passions/modding.png", "C.O.B."],
                    ["Modélisation et Animation en 3D", "/passions/modelisation_animation_3d.webp", "Aimerai apprendre"],
                    ["Cinéma et Animation", "/passions/cinema_animation.jpg", "Usagi Drop"],
                    ["Culture Musical", "/passions/culture_musical.jpg", "Bernard Lavilliers"]
                ].map(function ([name, picture, description]) {
                    return (
                        <div className="card">
                            <div>
                                <img src={picture} style="border-bottom-right-radius: 0;border-bottom-left-radius: 0" />
                            </div>
                            <div className="card-content">
                                <div>
                                    <h1>{name}</h1>
                                    <p>{description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}