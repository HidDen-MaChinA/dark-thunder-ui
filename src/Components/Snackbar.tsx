import { ReactNode } from "react";
import { SnackBarMessageType, useSnackBarStore } from "../utils/SnackBarStateManager";

export function SnackBarProvider(){
    const snackBarStore = useSnackBarStore();
    const onDeleteClickEventHandler = ()=>{
        snackBarStore.flushMessages();
    }
    return (
      <div>
        {snackBarStore.messages.length > 0 && (
          <div className="left-[35%] fixed z-40 max-h-[220px] items-center flex flex-col top-3 gap-2 flex">
            <div className="overflow-y-auto pb-3 px-4 max-h-[220px] flex flex-col gap-2">
              {snackBarStore.messages.map((message, i) => {
                return (
                  <SnackBar message={message} key={"snack-bar-message-" + i} />
                );
              })}
            </div>
            <button onClick={onDeleteClickEventHandler}>
              <div className="w-[45px] h-[45px] hover:bg-gray-200 duration-[500ms] flex justify-center items-center rounded-full bg-gray-300">
                <img
                  height={20}
                  width={20}
                  className="min-w-[20px] min-h-[20px]"
                  src="/images/icons/cross.svg"
                />
              </div>
            </button>
          </div>
        )}
      </div>
    );
}

function SnackBar(props: {message: SnackBarMessageType}){
    const {message} = props;
    return (
      <div
        className={`px-5 flex flex-row rounded-xl shadow-md shadow-gray-500 w-[350px] py-2 text-white ${message.type === "INFO" ? "bg-gray-800" : "bg-red-300"}`}
      >
        <p>
            {message.value}
        </p>
      </div>
    );
}
