import React, { useState } from "react"

export type SidebarProps = {
    closedWidth: number
    openedWidth?: number
    title: string
    children?: React.ReactNode
    sidebarStateModifier: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar(props: SidebarProps){
    const {closedWidth, title, children, openedWidth, sidebarStateModifier} = props;
    const [isOpened, setIsOpened] = useState(false);
    const [style, setStyle] = useState<React.CSSProperties>({
        width: closedWidth || "50px"
    });
    const sidebarMouseEnterEventHandler = () => {
        setStyle((_)=>({..._, width: openedWidth || "200px"}))
        sidebarStateModifier(true)
        setIsOpened(true)
    }

    const sidebarMouseLeaveEventHandler = () => {
        setStyle((_)=>({..._, width: closedWidth || "50px"}))
        sidebarStateModifier(false)
        setIsOpened(false)
    }
    return (
      <div
        style={style}
        onMouseEnter={sidebarMouseEnterEventHandler}
        onMouseLeave={sidebarMouseLeaveEventHandler}
        className="sticky transition-[700ms] left-0 h-[100vh] bg-black"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="shadow-lg flex items-center gap-3 transition-[500ms]" style={{justifyContent: isOpened ? "start" : "center", paddingLeft: isOpened ? closedWidth / 3 : 0}}>
            <div className="h-[45px] w-[45px]">
              <img
                src="/images/icons/smartphone.svg"
                className="h-full w-full"
                alt=""
              />
            </div>
            <h1
              className="text-white text-2xl"
              style={{
                position: isOpened ? "relative" : "absolute",
                opacity: isOpened ? 1 : 0,
              }}
            >
              {title}
            </h1>
          </div>
          <div className="w-full flex justify-center">
            <hr className="w-[90%]"/>
          </div>
          <div className="flex-1 overflow-hidden">
              {children}
          </div>
        </div>
      </div>
    );
}