import { useEffect, useState } from "react";
import { Discussion } from "../../../@types/Discussion";
import { Message as MessageType } from "../../../@types/Message";
import { DateNotifier } from "./DateNotifier";
import Message from "./Message";
import { MessageProvider } from "../../../Providers/MessageProvider";
import { DiscussionsStoreDiscussion, useDiscussionsStore } from "../../../utils/DiscussionsStateManager";
import { useDiscussionsManager } from "../../../services/DiscussionsManager";

type MessagePropsType = {
  discussion: Discussion | null;
  currentUserId: string;
};

export default function Messages(props: MessagePropsType) {
  const { discussion, currentUserId } = props;
  const store = useDiscussionsStore();
  const discussionsManager = useDiscussionsManager();
  const [currentDiscussion, setCurrentDiscussion] = useState<DiscussionsStoreDiscussion|null|undefined>(null);
  useEffect(()=>{
    if (discussion) {
      const temp = store.discussions.find((_) => _.id === discussion.id);
      temp && discussionsManager.discussionFetch({...temp}).then((discussionStore)=>{
        if(discussionStore){
          const newtemp = discussionStore.discussions.find((_) => _.id === discussion.id);
          setCurrentDiscussion(newtemp)
        }
      });
      setCurrentDiscussion(temp);
    }
  }, [discussion, store])

  if(discussion){
    return (
     <div className="w-full flex flex-col h-full">
      <div className="pb-5">
        {currentDiscussion && currentDiscussion.messages.length == 0 ? (
          <div className="w-full flex-col gap-4 flex p-4 items-center">
            <div className="w-[200px] h-[200px] overflow-hidden rounded-full border">
              <img src={discussion.image} alt="" />
            </div>
            <div className="w-full">
              <h3 className="text-center text-xl">{discussion.name}</h3>
            </div>
          </div>
        ) : (
          currentDiscussion && currentDiscussion.messages
            .sort(
              (itemA, itemB) =>{
                const dateA = new Date(itemA.updated_at)
                const dateB = new Date(itemB.updated_at)
                return dateA.getTime() - dateB.getTime()
              }
            )
            .map((items, index) => (
              <>
                <Message
                  message={items.value}
                  pfp={items.user.pfp}
                  userName={
                    items.user.id !== currentUserId ? items.user.username : ""
                  }
                  own={items.user.id === currentUserId}
                  date={new Date(items.updated_at)}
                  key={"message-" + index}
                />
              </>
            ))
        )}
      </div>
    </div>
     
    )
  }
  return <div></div>
}
