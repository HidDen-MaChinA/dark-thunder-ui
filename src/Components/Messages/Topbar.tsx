import React from "react";


type TopbarProps = {
    title?: string
}

export default function Topbar(props: React.HTMLAttributes<HTMLDivElement> & TopbarProps){
    const { title , children} = props;
    return (
        <div {...props} className="flex shadow-xl border-b sticky top-0 w-full">
            <h2 className="text-xl p-2 px-5">
                {title}
            </h2>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}