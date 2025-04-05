import React, { useContext, useEffect, useState } from "react";
import Context from "../AuthContext";
import Topbar from "../Components/Discussions/Topbar";
import Sidebar from "../Components/Discussions/Sidebar";
import Warning from "../Components/Discussions/Warning";
import Discussion from "../Components/Discussions/Discussion";
import Messages from "../Components/Discussions/Messages";
import InputBar from "../Components/Discussions/InputBar";
import CreateDiscussionButton from "../Components/Discussions/CreateDiscussionButton";
import { Discussion as DiscussionType } from "../@types/Discussion";
import { DiscussionProvider } from "../Providers/DiscussionProvider";
import Loading from "../Components/Loading";
import DiscussionQuickParametersModal from "../Components/Discussions/DiscussionQuickParametersModal";

export default function Discussions() {
  const currentUser = useContext(Context);
  const [isOpened, setIsOpened] = useState(false);
  const [discussions, setDiscussions] = useState<DiscussionType[] | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<DiscussionType | null>(null)
  const [currentDiscussionToParameter, setCurrentDiscussionToParameter] = useState<DiscussionType | null>(null);
  const [quickDiscussionParameterOpen, setQuickDiscussionParameterOpen] = useState(false);
  

  useEffect(()=>{
    DiscussionProvider.getAllDiscussions({page: 1}).then((res)=>{
      setDiscussions(res.items);
    });
  }, [])
  
  return (
    <div className="w-[100vw] flex flex-col h-[100vh] overflow-hidden">
      <Topbar title="something">
        <div className="flex bg-white justify-end p-2 h-full items-center">
          <Warning message="are you sure you want to do that bro ?" />
        </div>
      </Topbar>
      <DiscussionQuickParametersModal isOpened={quickDiscussionParameterOpen} setIsOpened={setQuickDiscussionParameterOpen}  currentDiscussion={currentDiscussionToParameter} />
      <div className="flex-1 flex relative">
        <Sidebar
          closedWidth={60}
          sidebarStateModifier={setIsOpened}
          openedWidth={300}
          title="Messages"
        >
          <div className="relative justify-between flex overflow-hidden flex-col h-full">
            <div className="py-2 mx-1 bg-white h-[400px] overflow-x-hidden"  style={{ flex: "1 1 0", overflowY: isOpened ? "auto" : "hidden" }}>
              {
                discussions ? 
                discussions.map((item) => (
                  <Discussion
                    onClick={()=>{
                      setSelectedDiscussion(item);
                    }}
                    expanded={isOpened}
                    moreClickEventHandler={()=>{
                      setCurrentDiscussionToParameter(item);
                      setQuickDiscussionParameterOpen(true);
                    }}
                    name={item.name}
                    key={item.id}
                  />
                )) : <div>{isOpened && "No Discussion"}</div>
              }
            </div>
            <div className="pt-3 px-2 bg-white h-[67px] w-full border-t border-t-gray-400">
              <CreateDiscussionButton href="/discussion/create" isExpanded={isOpened} />
            </div>
          </div>
        </Sidebar>
        <div className="w-full flex-1 justify-between flex flex-col">
          <div style={{ flex: "1 1 0" }} className="overflow-auto">
            <Loading loading={selectedDiscussion == null}>
              <Messages currentUserId={currentUser.user.id} messages={[]} discussion={selectedDiscussion}/>
            </Loading>
          </div>
          <div className="sticky bottom-0 bg-white">
            <InputBar />
          </div>
        </div>
      </div>
    </div>
  );
}
