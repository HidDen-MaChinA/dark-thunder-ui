import React, { useEffect } from "react";
import { Discussion } from "../../@types/Discussion";
import ReactPortal from "../ReactPortal";
import TextField from "../TextField";
import Button from "../Login/Button";
import DiscussionAddFriend from "./DiscussionAddFriend";
import { UserProvider } from "../../Providers/UserProviders";

type DiscussionQuickParametersModalPropsType = {
    currentDiscussion?: Discussion | null
    isOpened: boolean
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DiscussionQuickParametersModal(props: DiscussionQuickParametersModalPropsType){
    const { currentDiscussion, isOpened, setIsOpened } = props;
    useEffect(()=>{
        UserProvider.getFriends().then(console.log);
    }, [currentDiscussion])
    return (
        <div>
            {
                (currentDiscussion && isOpened) && 
                <ReactPortal wrapperId="discussion-quick-parameters-modal-id">
                    <div className="w-[100vw] h-[100vh]">
                        <div className="w-full h-full absolute z-10 bg-[#0f0f0f2f]" onClick={()=>{setIsOpened(false)}}></div>
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="p-3 bg-white rounded-lg relative z-30 border">
                                <div className="flex">
                                    <div>
                                        <div className="w-full relative flex justify-center">
                                            <div className="w-[70px] h-[70px] rounded-full border"></div>
                                        </div>
                                        <TextField label="Discussion name" defaultValue={currentDiscussion.name}></TextField>
                                        <TextField label="Discussion cover" type="file"></TextField>
                                        <TextField placeholder="/something/g" label="Messages restriction (regex)" defaultValue={currentDiscussion.message_restriction_regex}></TextField>
                                        <div className="mt-4">
                                            <Button>Modify</Button>
                                        </div>
                                    </div>
                                    <div className="w-[400px] h-[]">
                                        <DiscussionAddFriend discussion={currentDiscussion}></DiscussionAddFriend>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactPortal>
            }
        </div>
    )
}