import { useEffect, useState } from "react";
import TextField from "../TextField";
import { AddFriend } from "./AddFriend";
import Button from "../Login/Button";
import { UserProvider } from "../../Providers/UserProviders";
import { SimplifiedUser } from "../../@types/User";
import { UserFriendshipProvider } from "../../Providers/UserFriendshipProvider";

export default function AddFriendsTopBar(){
    const [isFocused, setIsFocused] = useState(false);
    const [page, setPage] = useState(0); 
    const [nonFriends, setNonFriends] = useState<SimplifiedUser[] | null>();
    const clickEventHandler = () => {
    console.log("something")
        setIsFocused(_=>{
          if(_){
            setPage(1);
          }
          return !_
        });
    }
    useEffect(()=>{
        UserProvider.getNonFriends().then((res)=>{
            setNonFriends(res);
            console.log(res)
        })
    },[page, isFocused])

    return (
      <div className="w-[400px] mr-[80px] relative z-20">
        <Button onClick={clickEventHandler}>Add Friends</Button>
        {isFocused && (
          <div className="max-h-[350px] overflow-y-auto border w-full z-20 px-2 py-1 absolute rounded-lg bg-white">
            <div className="sticky top-0 z-20">
              <TextField
                placeholder="something"
                style={{ textAlign: "center" }}
              ></TextField>
            </div>
            {nonFriends &&
              nonFriends.map((nonFriend) => (
                <AddFriend
                  key={nonFriend.id}
                  friend={{
                    id: nonFriend.id,
                    username: nonFriend.username,
                    pfp: nonFriend.pfp,
                  }}
                  onAddButtonClick={()=>{
                    UserFriendshipProvider.create(nonFriend.id);
                  }}
                ></AddFriend>
              ))}
          </div>
        )}
      </div>
    );
}