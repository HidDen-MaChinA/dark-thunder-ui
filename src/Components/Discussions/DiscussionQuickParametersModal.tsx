import React from "react";
import { Discussion } from "../../@types/Discussion";
import ReactPortal from "../ReactPortal";

type DiscussionQuickParametersModalPropsType = {
    currentDiscussion?: Discussion | null
    isOpened: boolean
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DiscussionQuickParametersModal(props: DiscussionQuickParametersModalPropsType){
    const { currentDiscussion, isOpened, setIsOpened } = props;
    return (
        <div>
            {
                (currentDiscussion && isOpened) && 
                <ReactPortal wrapperId="discussion-quick-parameters-modal-id">
                    <div className="w-[100vw] h-[100vh]">
                        <div className="w-full h-full absolute z-10 bg-[#0f0f0f2f]" onClick={()=>{setIsOpened(false)}}></div>
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="p-3 bg-white relative z-30 border">
                                {currentDiscussion.id}
                            </div>
                        </div>
                    </div>
                </ReactPortal>
            }
        </div>
    )
}