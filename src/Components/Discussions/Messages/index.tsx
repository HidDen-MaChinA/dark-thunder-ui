import { Discussion } from "../../../@types/Discussion";
import { Message as MessageType } from "../../../@types/Message";
import { DateNotifier } from "./DateNotifier";
import Message from "./Message";

type MessagePropsType = {
  messages: MessageType[];
  discussion: Discussion | null;
  currentUserId: string;
};

export default function Messages(props: MessagePropsType) {
  const { messages, discussion, currentUserId } = props;
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
