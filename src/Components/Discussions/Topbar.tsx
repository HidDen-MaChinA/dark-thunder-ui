import React, { useContext } from "react";
import Warning from "./Warning";
import Context from "../../AuthContext";


type TopbarProps = {
    title?: string
}

export default function Topbar(props: React.HTMLAttributes<HTMLDivElement> & TopbarProps){
    const { title , children} = props;
    const { user } = useContext(Context);
    return (
      <div
        {...props}
        className="flex pr-4 relative z-30 gap-2 shadow-md border-b sticky bg-white top-0 w-full"
      >
        <h2 className="text-xl p-2 px-5">{title}</h2>
        <div className="flex-1">{children}</div>
        <div className="flex items-center">
          <Warning message="are you sure you want to do that bro ?" />
        </div>
        <div className="p-1 flex justify-center items-center">
          <div className="p-2 flex justify-center items-center bg-gray-800 rounded-lg text-white">
            <p className="text-ellipsis whitespace-nowrap overflow-hidden">
              Connected as
            </p>
            <span className="w-[150px] items-center ml-1 p-1 bg-white text-center rounded-xl text-black  flex flex-row">
              <div className="w-[35px] h-[35px] overflow-hidden relative rounded-full bg-black">
                <img className="w-full" src={user.pfp} />
              </div>
              <p className="w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
                {user.username}
              </p>
            </span>
          </div>
        </div>
      </div>
    );
}