import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ReactPortalProps  = {
    wrapperId: string
    children?: React.ReactNode
}

export default function ReactPortal(props: ReactPortalProps){
    const {children, wrapperId } = props
    const [wrapper, setWrapper] = useState<HTMLElement | null>()
    useEffect(()=>{
        let wrapper = document.getElementById(wrapperId)
        if(!wrapper){
            const createdWrapper = document.createElement("div");
            createdWrapper.setAttribute("id", wrapperId)
            document.body.appendChild(createdWrapper)
            const createdWrapperRef = document.getElementById(wrapperId)
            wrapper = createdWrapperRef
        }
        if(wrapper){
            wrapper.setAttribute("style", "position: absolute; top:0; width: 100vw; height: 100vh")

        }
        setWrapper(wrapper);
        return ()=>{
            document.body.removeChild(wrapper as Node)
        }
    }, [])
    return wrapper ? createPortal(children, wrapper) : <div></div>
}