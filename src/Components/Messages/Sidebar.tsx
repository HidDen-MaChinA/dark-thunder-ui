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
        className="sticky transition-[700ms] left-0 top-[100px] h-[100vh] bg-black"
      >
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1 overflow-hidden">
              {children}
          </div>
        </div>
      </div>
    );
}