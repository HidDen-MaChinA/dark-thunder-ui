import { SimplifiedUser } from "../../@types/User"
import Button from "../Login/Button"

type AddFriendPropsType = {
    friend: SimplifiedUser
    onAddButtonClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function AddFriend(props: AddFriendPropsType){
    const {onAddButtonClick, friend} = props;
    return (
        <div className="flex items-center px-2 py-2 rounded-lg hover:bg-gray-100">
            <div className="relative w-[45px] h-[45px] rounded-full border"></div>
            <div style={{flex: "1 1 0"}} className="px-2 text-[#0f0f0f] text-ellipsis whitespace-nowrap overflow-hidden">{friend.username}</div>
            <div>
                <Button onClick={onAddButtonClick} inverted>Add</Button>
            </div>
        </div>
    )
}