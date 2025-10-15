import { useContext, useEffect, useState } from "react"
import Context from "../AuthContext"
import Topbar from "../Components/Discussions/Topbar"
import { UsersList, UsersListItem } from "../Components/UsersList"
import { UserProvider } from "../Providers/UserProviders"
import { SimplifiedUser, SimplifiedUserFriend } from "../@types/User"
import { Friendship } from "../@types/Friendships"
import { UserFriendshipProvider } from "../Providers/UserFriendshipProvider"
import AddFriendsTopBar from "../Components/Discussions/AddFriendsTopBar"
import { useSnackBarManager } from "../hooks/useSnackBarManager"
import { SnackBarProvider } from "../Components/Snackbar"

export default function FriendsManagement(){
    const [friends, setFriends] = useState<SimplifiedUserFriend[]>([]);
    const [receivedFriendships, setReceivedFriendships] = useState<Friendship[]>([])
    const [sentFriendships, setSentFriendships] = useState<Friendship[]>([])
    const [shouldUpdate, setShouldUpdate] = useState([])
    const snackBarManager = useSnackBarManager()

    useEffect(()=>{
        UserProvider.getFriends().then((res)=>{
            setFriends(res);
        })
        UserFriendshipProvider.getAllReceived({page: 1}).then(setReceivedFriendships)
        UserFriendshipProvider.getAllSent({page: 1}).then(setSentFriendships)
    }, [shouldUpdate])
    return (
      <div>
        <SnackBarProvider />
        <Topbar title="Friendships Management">
            <div className="w-full h-full flex justify-center items-center pr-[7%]">
                <AddFriendsTopBar />
            </div>
        </Topbar>
        <div className="flex w-full gap-3 p-3">
          <div className="flex-1 rounded-xl border p-3">
            <h1 className="text-xl mb-3">Friends</h1>
            <UsersList>
              {friends.map((friend) => (
                <UsersListItem name={friend.username} buttons={[
                    {
                        clickEventHandler: ()=>{
                          UserFriendshipProvider.delete({friendship_id: friend.friendship_id})
                            .then(()=>{
                              setShouldUpdate([])
                              snackBarManager.notifyUser({type: "INFO", value: `${friend.username} is no longer your friend.`})
                            })
                        },
                        text: {
                            color: "black",
                            value: "unfriend"
                        },
                        bgColor: "#dddddd"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
          <div className="flex-1 rounded-xl border p-3">
            <h1 className="text-xl mb-3">Received Friendships</h1>
            <UsersList>
              {receivedFriendships.map((friendship) => (
                <UsersListItem name={friendship.sender_user.username} buttons={[
                    {
                        clickEventHandler: ()=>{
                          UserFriendshipProvider.allow({
                            friendship_id:friendship.id
                          })
                          .then(()=>{
                            setShouldUpdate([])
                            snackBarManager.notifyUser({type: "INFO", value: `You are now friend with ${friendship.sender_user.username}.`})
                          })
                        },
                        text: {
                            color: "white",
                            value: "allow"
                        },
                        bgColor: "#22283f"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
          <div className="flex-1 border rounded-xl p-3">
            <h1 className="text-xl mb-3">Sent Friendships</h1>
            <UsersList>
              {sentFriendships.map((friendship) => (
                <UsersListItem img={friendship.receiver_user.pfp} name={friendship.receiver_user.username} buttons={[
                    {
                        clickEventHandler: ()=>{

                        },
                        text: {
                            color: "white",
                            value: "cancel"
                        },
                        bgColor: "#333333"
                    }
                ]} />
              ))}
            </UsersList>
          </div>
        </div>
      </div>
    );
}