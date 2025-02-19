import { useState } from "react";
import ProjectSlider from "./ProjectSlider";

export default function Projects(){
    const [backgroundImage, setBackgroundImage] = useState("");
    return (
        <div className="w-full relative">
            <div className="absolute w-full z-10 h-full">
                <div className="w-full h-full absolute bg-[#ffffff80]"></div>
                <div className="w-full h-full">
                    <img src={"/images/projects/" + backgroundImage} className="w-full h-full" alt="" />
                </div>
            </div>
            <div className="relative z-20">
                <ProjectSlider setBackgroundImage={setBackgroundImage}/>
            </div>
        </div>
    )
}