import { useContext, useState } from "react";
import Friend from "../Components/Messages/Friend";
import Sidebar from "../Components/Messages/Sidebar";
import Topbar from "../Components/Messages/Topbar";
import Warning from "../Components/Messages/Warning";
import Discussions from "../Components/Messages/Discussions";
import InputBar from "../Components/Messages/InputBar";
import Context from "../AuthContext";

export default function Messages() {
  const currentUser = useContext(Context); 
  const [isOpened, setIsOpened] = useState(false);
  const arr = [];
  for (let i = 0; i < 15; i++) {
    arr.push(i);
  }
  return (
    <div className="w-[100vw] flex flex-col h-[100vh] overflow-hidden">
      <Topbar title="something">
        <div className="flex bg-white justify-end p-2 h-full items-center">
          <Warning message="are you sure you want to do that bro ?" />
        </div>
      </Topbar>
      <div className="flex-1 flex relative">
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
        <div className="w-full flex-1 justify-between flex flex-col">
          <div style={{flex: "1 1 0"}} className="overflow-auto mb-[50px]">
            <Discussions />
          </div>
          <div className="sticky bottom-0 bg-white">
            <InputBar />
          </div>
        </div>
      </div>
    </div>
  );
}
