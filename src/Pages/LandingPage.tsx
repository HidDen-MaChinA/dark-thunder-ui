import { HTMLAttributes } from "react";
import LanguageList from "../Components/LandingPage/LanguageList";
import Navbar from "../Components/LandingPage/Navbar";
import Presentation from "../Components/LandingPage/Presentation";
import Contact from "../Components/LandingPage/Contact";
import Projects from "../Components/LandingPage/Projects";

export default function LandingPage(){
    return (
        <div>
            <Navbar />
            <Presentation />
            <LanguageListWrapper>
                <LanguageList />
            </LanguageListWrapper>
            <ProjectsWrapper>
                <Projects />
            </ProjectsWrapper>
            <ContactWrapper>
                <Contact />
            </ContactWrapper>
        </div>
    )
}

function LanguageListWrapper(props: HTMLAttributes<HTMLDivElement>){
    return <div className="p-0 m-0" {...props}/>
}
function ContactWrapper(props: HTMLAttributes<HTMLDivElement>){
    return <div className="p-0 m-0 bg-black text-white" {...props}/>
}
function ProjectsWrapper(props: HTMLAttributes<HTMLDivElement>){
    return <div className="p-0 m-0 text-white" {...props}/>
}