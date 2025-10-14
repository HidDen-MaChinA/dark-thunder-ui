import { useContext, useEffect, useState } from "react";
import Context from "../AuthContext";
import Topbar from "../Components/Discussions/Topbar";
import Sidebar from "../Components/Discussions/Sidebar";
import Discussion from "../Components/Discussions/Discussion";
import Messages from "../Components/Discussions/Messages";
import InputBar from "../Components/Discussions/InputBar";
import CreateDiscussionButton from "../Components/Discussions/CreateDiscussionButton";
import { Discussion as DiscussionType } from "../@types/Discussion";
import Loading from "../Components/Loading";
import { MessageProvider } from "../Providers/MessageProvider";
import { blobToObject } from "../utils/ArrayBufferToObject";
import useWebSocket from "../hooks/useWebSocket";
import { useDiscussionsManager } from "../services/DiscussionsManager";
import { useDiscussionsStore } from "../utils/DiscussionsStateManager";

export default function Discussions() {
  const currentUser = useContext(Context);
  const store = useDiscussionsStore();
  const discussionsManager = useDiscussionsManager();
  const [isOpened, setIsOpened] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<DiscussionType | null>(null);
  const [page, setPage] = useState({ page: 1 });
  const [discussionsPromiseDone, setDiscussionsPromiseDone] =
    useState<boolean>(false);
  const [messageValue, setMessageValue] = useState("");

  const moreDiscussionButtonClickEventHandler = () => {
    if (discussionsPromiseDone) {
      setPage((_) => ({ page: _.page + 1 }));
    }
  };

  const handleSendMessage = () => {
    if (selectedDiscussion) {
      setMessageValue("")
      MessageProvider.create({
        discussion_id: selectedDiscussion.id,
        value: messageValue,
      }).then(()=>{
      });
    } else {
      alert("select a discussion first");
    }
  };


  const socketManager = useWebSocket("http://localhost:7000");
  const eventListener = (event:MessageEvent) => {
    blobToObject(event.data).then((event: {event: string})=>{
     const eventPayload = event.event.split(":")
     if(eventPayload[0] === "message"){
        const discussion = store.discussions.find(_=>_.id === eventPayload[1])
        if(discussion){
          discussionsManager.discussionMessageFetch(discussion); 
        }
     }
      // discussionsManager.discussionsFetch(page.page);
    })
  }
  useEffect(() => {
    if(!discussionsPromiseDone){
      discussionsManager.discussionsFetch(page.page).then(()=>{
        setDiscussionsPromiseDone(true);
      });
      socketManager.openConnection().onMessage(eventListener);
    }
    return ()=>{
      socketManager.removeSocket();
    }
  }, [store]);
  return (
    <div className="w-[100vw] flex flex-col h-[100vh] overflow-hidden">
      <Topbar title="something">
        <div className="flex bg-white flex-1 justify-end gap-3 h-full items-center">
          <a
            href="/user/friends/management"
            className="relative w-[40px] p-1 h-[40px] flex justify-center items-center rounded-full bg-blue-400"
          >
            <img
              src="/images/icons/contact-phone.svg"
              className="w-full h-full"
              alt=""
            />
          </a>
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
            <div
              onScroll={(e) => {
                console.log(e.detail);
              }}
              className="py-2 mx-1 bg-white h-[400px] overflow-x-hidden"
              style={{ flex: "1 1 0", overflowY: isOpened ? "auto" : "hidden" }}
            >
              {store.discussions.length !== 0 ? (
                store.discussions.map((item) => (
                  <Discussion
                    href={"/discussion/parameter/" + item.id}
                    onClick={() => {
                      setSelectedDiscussion(item);
                    }}
                    image={item.image}
                    expanded={isOpened}
                    lastMessage={item.messages[item.messages.length - 1]}
                    name={item.name}
                    key={item.id}
                  />
                ))
              ) : (
                <div>{isOpened && "No Discussion"}</div>
              )}
              {isOpened && (
                <button
                  onClick={moreDiscussionButtonClickEventHandler}
                  className="w-full rounded-xl transition-[300ms] hover:bg-gray-300 p-3 flex justify-center items-center"
                >
                  <p className="text-lg">More</p>
                </button>
              )}
            </div>
            <div className="pt-3 px-2 bg-white h-[67px] w-full border-t border-t-gray-400">
              <CreateDiscussionButton
                href="/discussion/create"
                isExpanded={isOpened}
              />
            </div>
          </div>
        </Sidebar>
        <div className="w-full flex-1 justify-between flex flex-col">
          <div style={{ flex: "1 1 0" }} className="overflow-auto">
            <Loading loading={selectedDiscussion == null}>
              <Messages
                currentUserId={currentUser.user.id}
                discussion={selectedDiscussion}
              />
            </Loading>
          </div>
          <div className="sticky bottom-0 bg-white">
            <InputBar
              onButtonClicked={handleSendMessage}
              value={messageValue}
              onChange={(e) => {
                setMessageValue(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
