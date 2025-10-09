import React, { useEffect, useState } from "react";
import { Message } from "../../@types/Message";

export type DiscussionPropsType = {
  expanded: boolean;
  name: string;
  href: string;
  lastMessage?: Message;
  profilePicture?: string;
  image?:string
  online?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export default function Discussion(props: DiscussionPropsType) {
  const {
    image,
    expanded,
    name,
    lastMessage,
    online,
    onClick,
    href
  } = props;
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [hover, setHover] = useState(false);

  const mouseEnterEventHandler = () => {
    setHover(true);
  };

  const mouseLeaveEventHandler = () => {
    setHover(false);
  };

  useEffect(() => {
    if (expanded) {
      setTimeout(() => {
        setStyle((_) => ({
          ..._,
          transitionDuration: "400ms",
          position: "relative",
          zIndex: 1,
          opacity: 1,
        }));
      }, 200);
    } else {
      setStyle((_) => ({
        ..._,
        transitionDuration: "0ms",
        zIndex: -1,
        opacity: 0,
      }));
    }
  }, [expanded]);
  return (
    <div
      onMouseLeave={mouseLeaveEventHandler}
      onMouseEnter={mouseEnterEventHandler}
      className="w-full py-2 flex items-center relative rounded-xl transition-[800ms] hover:bg-gray-200"
    >
      <div onClick={onClick}>
        <div className="rounded-full w-[40px] absolute left-[5px] block h-[40px] bg-white">
          <img className="w-full border border-gray-400 h-full rounded-full" src={image} />
          <div className="bg-gray-300 right-0 bottom-[-5px] p-1 rounded-full absolute">
            <div
              className="rounded-full h-[10px] w-[10px]"
              style={{ backgroundColor: online ? "green" : "red" }}
            ></div>
          </div>
        </div>
        <div
          className="text-black flex px-2 flex-1 justify-between relative ml-[50px]"
          style={style}
        >
          <div>
            <h4 className="bold w-[170px] text-ellipsis whitespace-nowrap overflow-hidden">{name}</h4>
            <p className="text-gray-500 w-[150px] text-sm text-ellipsis whitespace-nowrap overflow-hidden">
              {lastMessage ?  lastMessage.value :  "You can now send a message !"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full h-full">
        <div>
            {hover && (
              <div className="flex">
                <a
                  href={href}
                  className="w-[30px] bg-blue-500 hover:bg-blue-600 transition-[500ms] h-[30px] rounded-full"
                ></a>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
