import AboutMe from "./about-me.GET.esm.jsx";
import Projects from "./projects/index.GET.esm.jsx";
import Certifications from "./certifications/index.GET.esm.jsx";
import WorkExperience from "./work-experience.GET.esm.jsx";
import TechnologyWatch from "./technology-watch/index.GET.esm.jsx";
import Passions from "./passions.GET.esm.jsx";
import Contact from "./contact.GET.esm.jsx";
export default async function index () {
    return (
        <>
            <a name="about-me">{AboutMe.call(this)}</a>
            <a name="projects">
                <h1 style="text-align: center;margin-bottom: 0">Projets</h1>
                {await Projects.call(this)}
            </a>
            <a name="certifications">
                <h1 style="text-align: center;margin-bottom: 0">Certifications</h1>
                {await Certifications.call(this)}
            </a>
            <a name="work-experience">
                <h1 style="text-align: center;margin-bottom: 0">Expérience professionnelle</h1>
                {WorkExperience.call(this)}
            </a>
            <a name="technology-watch">
                <h1 style="text-align: center;margin-bottom: 0">Veille technologique</h1>
                {TechnologyWatch.call(this)}
            </a>
            <a name="passions">
                <h1 style="text-align: center;margin-bottom: 0">Passions</h1>
                {Passions.call(this)}
            </a>
            <a name="contact">{await Contact.call(this)}</a>
        </>
    )
}