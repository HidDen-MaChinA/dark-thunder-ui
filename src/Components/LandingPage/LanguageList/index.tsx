import LanguageCard, { LanguageCardProps } from "./LanguageCard"

export default function LanguageList(){
    const languages : LanguageCardProps[] = [
        {color: "rgb(255, 197, 59)", imgName: "js.png", level: 90, name: "Javascript"},
        {color: "rgb(56, 218, 255)", imgName: "react.png", level: 90, name: "React"},
        {color: "rgb(41, 136, 237)", imgName: "ts.png", level: 90, name: "Typescript"},
        {color: "rgb(255, 45, 32)", imgName: "laravel.png", level: 86, name: "Laravel"},
    ]
    return (
        <div id="language-list" className="p-6">
            <h3 className="text-black w-full text-center text-2xl text-gray-700 underline">Languages</h3>
            <div className="justify-center flex-wrap gap-8 flex my-4">
                {
                    languages.map((item, i)=>(<LanguageCard key={"LanguageCard-id-" + i} {...item}/>))
                }
            </div>
        </div>
    )
}