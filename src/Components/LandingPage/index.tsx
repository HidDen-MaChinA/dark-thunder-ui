import { HTMLAttributes } from "react";
import LanguageList from "./LanguageList";

export default function LandingPage(){
    return (
        <div>
            <LanguageListWrapper>
                <LanguageList />
            </LanguageListWrapper>
        </div>
    )
}

function LanguageListWrapper(props: HTMLAttributes<HTMLDivElement>){
    return <div className="p-0 m-0 bg-white" {...props}/>
}