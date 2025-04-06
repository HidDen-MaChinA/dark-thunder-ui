import { Discussion } from "../../@types/Discussion"
import { SimplifiedUser } from "../../@types/User";
import Button from "../Login/Button";
import TextField from "../TextField";

type DiscussionAddFriendPropsType = {
    discussion: Discussion
}

export default function DiscussionAddFriend(props: DiscussionAddFriendPropsType){
    const {discussion} = props;
    const arr = Array.of(1,2,3,4,5,6,6,7,8,6,7,6,7,6)
    return(
        <div className="w-full flex flex-col h-full relative">
            <div className="p-3">
                <TextField placeholder="Search friends..."/>
            </div>
            <div style={{flex: "1 1 0"}} className="overflow-y-auto p-3">
                {/* {
                    arr.map(()=><AddFriend />)
                } */}
            </div>
        </div>
    )
}

type AddFriendPropsType = {
    friend: SimplifiedUser
}

function AddFriend(props: AddFriendPropsType){
    return (
        <div className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100">
            <div className="relative w-[45px] h-[45px] rounded-full border"></div>
            <div style={{flex: "1 1 0"}} className="px-2 text-[#0f0f0f] text-ellipsis whitespace-nowrap overflow-hidden">Niaina Franco</div>
            <div>
                <Button inverted>Add</Button>
            </div>
        </div>
    )
}