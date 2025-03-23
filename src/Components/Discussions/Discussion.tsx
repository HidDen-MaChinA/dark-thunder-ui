import React, { useEffect, useState } from "react"

export type DiscussionPropsType= {
    expanded: boolean
    name: string
    lastMessage?: string
    profilePicture?: string
    online?: boolean
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


export default function Discussion(props: DiscussionPropsType) { 
    const { expanded, name, lastMessage, online } = props;
    const [style, setStyle] = useState<React.CSSProperties>({});
    useEffect(()=>{
        if(expanded){
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
                zIndex: -1,
                opacity: 0
            }))
        }
    }, [expanded])
    return (
        <div {...props} className="w-full py-2 flexitems-center relative rounded-xl transition-[500ms] hover:bg-gray-100">
            <div className="rounded-full w-[40px] absolute left-[5px] block h-[40px] bg-white">
                <img src="" alt="" className="w-full border border-gray-400 h-full rounded-full" />
                <div className="bg-gray-300 right-0 bottom-[-5px] p-1 rounded-full absolute">
                    <div className="rounded-full h-[10px] w-[10px]" style={{backgroundColor: online ? "green" : "red"}}></div>
                </div>
            </div>
            <div className="text-black px-2 flex-1 relative ml-[50px]" style={style}>
                <h4 className="bold">{name}</h4>
                <p className="text-gray-500 w-[200px] text-sm text-ellipsis whitespace-nowrap overflow-hidden">{lastMessage || name + " was added !"}</p>
            </div>
        </div>
    )
}