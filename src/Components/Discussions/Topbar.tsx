import React from "react";
import Warning from "./Warning";


type TopbarProps = {
    title?: string
}

export default function Topbar(props: React.HTMLAttributes<HTMLDivElement> & TopbarProps){
    const { title , children} = props;
    return (
        <div {...props} className="flex relative z-30 shadow-md border-b sticky bg-white top-0 w-full">
            <h2 className="text-xl p-2 px-5">
                {title}
            </h2>
            <div className="flex-1">
                {children}
            </div>
              <div className="flex items-center px-2">
                <Warning message="are you sure you want to do that bro ?" />
              </div>
        </div>
    )
}