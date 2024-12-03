import AboutMe from "./about-me.GET.esm.jsx";
import Projects from "./projects.GET.esm.jsx";
import Certifications from "./certifications.GET.esm.jsx";
import WorkExperience from "./work-experience.GET.esm.jsx";
import TechnologyWatch from "./technology-watch.GET.esm.jsx";
import Passions from "./passions.GET.esm.jsx";
import Contact from "./contact.GET.esm.jsx";
export default async function index () {
    return (
        <>
            <a name="about-me">{AboutMe.call(this)}</a>
            <a name="projects">{await Projects.call(this)}</a>
            <a name="certifications">{Certifications.call(this)}</a>
            <a name="work-experience">{WorkExperience.call(this)}</a>
            <a name="technology-watch">{TechnologyWatch.call(this)}</a>
            <a name="passions">{Passions.call(this)}</a>
            <a name="contact">{await Contact.call(this)}</a>
        </>
    )
}