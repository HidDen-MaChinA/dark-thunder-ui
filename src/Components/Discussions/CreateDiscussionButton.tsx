import React, { useEffect, useState } from "react"

export type CreateDiscussionPropsType = {
    isExpanded: boolean
} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>


export default function CreateDiscussionButton(props: CreateDiscussionPropsType) { 
    const { isExpanded, href } = props;
    const [style, setStyle] = useState<React.CSSProperties>({});
    useEffect(()=>{
        if(isExpanded){
            setTimeout(()=>{
                setStyle(_=>({..._,
                    transitionDuration: "400ms",
                    position: "relative",
                    zIndex: 1,
                    opacity: 1
                }))
            }, 200)
        }else{
            setStyle(_=>({..._,
                transitionDuration: "0ms",
                position: "absolute",
                zIndex: -1,
                opacity: 0
            }))
        }
    }, [isExpanded])
    return (
        <a href={href} className="flex block shadow-md px-1 items-center relative rounded-xl hover:brightness-150 transition-[500ms] bg-[#1f1f1f]">
            <div className="rounded-full w-[40px] flex justify-center items-center left-[5px] block h-[40px]">
                <div className="h-[30px] rounded-xl bg-white w-[7px] absolute rotate-[90deg]"></div>
                <div className="h-[30px] rounded-xl bg-white w-[7px]"></div>
            </div>
            <div className="text-white px-2 flex-1 relative ml-[50px]" style={style}>
                <h4 className="bold">Create Discussion</h4>
            </div>
        </a>
    )
}