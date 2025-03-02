import { useState } from "react";
import Friend from "../Components/Messages/Friend";
import Sidebar from "../Components/Messages/Sidebar";
import Topbar from "../Components/Messages/Topbar";
import Modal from "../Components/Modal";

export default function Messages(){
    const [isOpened, setIsOpened] = useState(false);
    const arr = []
    for (let i = 0; i < 15; i++) {
        arr.push(i);
    }
    return (
      <div className="w-[100vw] h-[100vh] overflow-hidden">
        <Topbar title="something">
          <div className="flex justify-end p-2 h-full items-center">
            <Modal button={ <div className="h-[35px] w-[35px] bg-black rounded-full"></div> } >
                <div className=""></div>
            </Modal>
          </div>
        </Topbar>
        <Sidebar
          closedWidth={60}
          sidebarStateModifier={setIsOpened}
          openedWidth={300}
          title="Messages"
        >
          <div
            className="p-[5px] mt-[5px] flex overflow-x-hidden flex-col h-full"
            style={{ overflowY: isOpened ? "auto" : "hidden" }}
          >
            {arr.map((i, index) => (
              <Friend
                expanded={isOpened}
                online={i % 2 == 0}
                lastMessage="hellow boy how you doing ? last night was crazy huh ?"
                name={"COCO" + i}
                key={"friend-component-id-" + index}
              />
            ))}
          </div>
        </Sidebar>
      </div>
    );
}