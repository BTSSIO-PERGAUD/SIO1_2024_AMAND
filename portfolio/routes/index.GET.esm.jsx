import AboutMe from "./about-me.GET.esm.jsx";
import Projects from "./projects/index.GET.esm.jsx";
import Certifications from "./certifications/index.GET.esm.jsx";
import WorkExperience from "./work-experience/index.GET.esm.jsx";
import TechnologyWatch from "./technology-watch/index.GET.esm.jsx";
import Passions from "./passions/index.GET.esm.jsx";
import Contact from "./contact.GET.esm.jsx";
export default async function index () {
    return (
        <>
            <a name="about-me"></a>
            {AboutMe.call(this)}
            <h1 style="text-align: center;margin-bottom: 0"><a className="link" name="projects" href="#projects">Projets</a></h1>
            {await Projects.call(this)}
            <h1 style="text-align: center;margin-bottom: 0"><a className="link" name="certifications" href="#certifications">Certifications</a></h1>
            {Certifications.call(this)}
            <h1 style="text-align: center;margin-bottom: 0"><a className="link" name="work-experience" href="#work-experience">Expérience professionnelle</a></h1>
            {WorkExperience.call(this)}
            <h1 style="text-align: center;margin-bottom: 0"><a className="link" name="technology-watch" href="#technology-watch">Veille technologique</a></h1>
            {TechnologyWatch.call(this)}
            <h1 style="text-align: center;margin-bottom: 0"><a className="link" name="passions" href="#passions">Passions</a></h1>
            {Passions.call(this)}
            <a name="contact"></a>
            {await Contact.call(this)}
        </>
    )
}