import { useContext, useEffect, useState } from "react"
import Context from "../AuthContext"
import Topbar from "../Components/Discussions/Topbar"
import { UsersList, UsersListItem } from "../Components/UsersList"
import { UserProvider } from "../Providers/UserProviders"
import { SimplifiedUser, SimplifiedUserFriend } from "../@types/User"
import { Friendship } from "../@types/Friendships"
import { UserFriendshipProvider } from "../Providers/UserFriendshipProvider"
import AddFriendsTopBar from "../Components/Discussions/AddFriendsTopBar"

export default function FriendsManagement(){
    const context = useContext(Context)
    const [friends, setFriends] = useState<SimplifiedUserFriend[]>([]);
    const [receivedFriendships, setReceivedFriendships] = useState<Friendship[]>([])
    const [sentFriendships, setSentFriendships] = useState<Friendship[]>([])
    const [shouldUpdate, setShouldUpdate] = useState([])

    useEffect(()=>{
        UserProvider.getFriends().then((res)=>{
            setFriends(res);
        })
        UserFriendshipProvider.getAllReceived({page: 1}).then(setReceivedFriendships)
        UserFriendshipProvider.getAllSent({page: 1}).then(setSentFriendships)
    }, [shouldUpdate])
    return (
      <div>
        <Topbar title="Friendships Management">
            <div className="w-full flex justify-center pr-[7%]">
                <AddFriendsTopBar />
            </div>
        </Topbar>
        <div className="flex w-full gap-3 p-3">
          <div className="flex-1 border p-3">
            <h1 className="text-xl mb-3">Friends</h1>
            <UsersList>
              {friends.map((friend) => (
                <UsersListItem name={friend.username} buttons={[
                    {
                        clickEventHandler: ()=>{
                          UserFriendshipProvider.delete({friendship_id: friend.friendship_id})
                            .then(()=>{
                              setShouldUpdate([])
                            })
                        },
                        text: {
                            color: "white",
                            value: "unfriend"
                        },
                        bgColor: "red"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
          <div className="flex-1 border p-3">
            <h1 className="text-xl mb-3">Received Friendships</h1>
            <UsersList>
              {receivedFriendships.map((friendship) => (
                <UsersListItem name={friendship.sender_user.username} buttons={[
                    {
                        clickEventHandler: ()=>{
                          UserFriendshipProvider.allow({
                            friendship_id:friendship.id
                          })
                        },
                        text: {
                            color: "white",
                            value: "allow"
                        },
                        bgColor: "green"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
          <div className="flex-1 border p-3">
            <h1 className="text-xl mb-3">Sent Friendships</h1>
            <UsersList>
              {sentFriendships.map((friendship) => (
                <UsersListItem name={friendship.receiver_user.username} buttons={[
                    {
                        clickEventHandler: ()=>{

                        },
                        text: {
                            color: "white",
                            value: "unfriend"
                        },
                        bgColor: "red"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
        </div>
      </div>
    );
}