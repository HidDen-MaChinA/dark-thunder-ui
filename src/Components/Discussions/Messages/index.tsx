import { useEffect, useState } from "react";
import { Discussion } from "../../../@types/Discussion";
import { Message as MessageType } from "../../../@types/Message";
import { DateNotifier } from "./DateNotifier";
import Message from "./Message";
import { MessageProvider } from "../../../Providers/MessageProvider";

type MessagePropsType = {
  discussion: Discussion | null;
  currentUserId: string;
  messages: MessageType[]
};

export default function Messages(props: MessagePropsType) {
  const { discussion, currentUserId, messages } = props;

  return discussion ? (
    <div className="w-full flex flex-col h-full">
      <div className="pb-5">
        {messages.length == 0 ? (
          <div className="w-full flex-col gap-4 flex p-4 items-center">
            <div className="w-[200px] h-[200px] overflow-hidden rounded-full border">
              <img src={discussion.image} alt="" />
            </div>
            <div className="w-full">
              <h3 className="text-center text-xl">{discussion.name}</h3>
            </div>
          </div>
        ) : (
          messages
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
  ) : (
    <div></div>
  );
}
