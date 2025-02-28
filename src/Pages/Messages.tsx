import { useState } from "react";
import Friend from "../Components/Messages/Friend";
import Sidebar from "../Components/Messages/Sidebar";

export default function Messages(){
    const [isOpened, setIsOpened] = useState(false);
    const arr = []
    for (let i = 0; i < 15; i++) {
        arr.push(i);
    }
    return (
        <div className="w-[100vw] h-[100vh]">
            <Sidebar closedWidth={60} sidebarStateModifier={setIsOpened} openedWidth={300} title="Messages">
                <div className="p-[5px] mt-[5px] flex overflow-x-hidden flex-col h-full" style={{overflowY: isOpened ? "auto" : "hidden"}}>
                    {arr.map((i)=>(
                        <Friend expanded={isOpened} online={i % 2 == 0} lastMessage="hellow boy how you doing ? last night was crazy huh ?" name={"COCO" + i}/>
                    ))}
                </div>
            </Sidebar>
        </div>
    )
}