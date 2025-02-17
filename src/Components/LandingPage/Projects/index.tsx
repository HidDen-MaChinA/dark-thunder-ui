import ProjectSlider from "./ProjectSlider";

export default function Projects(){
    return (
        <div className="w-full bg-[#222222] relative shadow-inner shadow-[#3e3e3e]">
            <div className="absolute w-full z-10 h-full">
                <div className="w-full h-full absolute bg-[#000000b0]"></div>
                <div className="w-full h-full">
                    <img src="/images/projects/instatdataview.png" className="w-full h-full" alt="" />
                </div>
            </div>
            <div className="relative z-20">
                <ProjectSlider />
            </div>
        </div>
    )
}