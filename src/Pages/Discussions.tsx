import { useContext, useState } from "react";
import Context from "../AuthContext";
import Topbar from "../Components/Discussions/Topbar";
import Sidebar from "../Components/Discussions/Sidebar";
import Warning from "../Components/Discussions/Warning";
import Discussion from "../Components/Discussions/Discussion";
import Messages from "../Components/Discussions/Messages";
import InputBar from "../Components/Discussions/InputBar";
import CreateDiscussion from "../Components/Discussions/CreateDiscussion";

export default function Discussions() {
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
          <div className="relative justify-between flex overflow-hidden flex-col h-full">
            <div className="py-2 mx-1 bg-white h-[400px] overflow-x-hidden"  style={{ flex: "1 1 0", overflowY: isOpened ? "auto" : "hidden" }}>
              {arr.map((i, index) => (
                <Discussion
                  expanded={isOpened}
                  online={i % 2 == 0}
                  lastMessage="hellow boy how you doing ? last night was crazy huh ?"
                  name={"COCO" + i}
                  key={"friend-component-id-" + index}
                />
              ))}
            </div>
            <div className="pt-3 px-2 bg-white h-[67px] w-full border-t border-t-gray-400">
              <CreateDiscussion expanded={isOpened} />
            </div>
          </div>
        </Sidebar>
        <div className="w-full flex-1 justify-between flex flex-col">
          <div style={{ flex: "1 1 0" }} className="overflow-auto">
            <Messages />
          </div>
          <div className="sticky bottom-0 bg-white">
            <InputBar />
          </div>
        </div>
      </div>
    </div>
  );
}
