import { useEffect, useState } from "react";
import { Discussion } from "../../../@types/Discussion";
import { Message as MessageType } from "../../../@types/Message";
import { DateNotifier } from "./DateNotifier";
import Message from "./Message";
import { MessageProvider } from "../../../Providers/MessageProvider";

type MessagePropsType = {
  discussion: Discussion | null;
  currentUserId: string;
};

export default function Messages(props: MessagePropsType) {
  const { discussion, currentUserId } = props;
  const [messages, setMessages] = useState<MessageType[]>([]);
  useEffect(()=>{
    discussion &&
    MessageProvider.getLatestMessages({
      discussion_id: discussion.id,
      page: 1
    }).then(setMessages);
  }, [discussion])

  return discussion ? (
    <div className="w-full flex flex-col h-full">
      <div>
        {messages.length == 0 ? (
          <div className="w-full flex-col gap-4 flex p-4 items-center">
            <div className="w-[200px] h-[200px] rounded-full border">
              <img src="" alt="" />
            </div>
            <div className="w-full">
              <h3 className="text-center text-xl">{discussion.name}</h3>
            </div>
          </div>
        ) : (
          messages.map((items, index) => (
            <Message
              message={items.value}
              userName={
                items.user.id !== currentUserId ? items.user.username : ""
              }
              own={items.user.id === currentUserId}
              date={new Date()}
              key={"message-" + index}
            />
          ))
        )}
        <DateNotifier date={new Date()} />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
