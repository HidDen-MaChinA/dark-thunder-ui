import { useEffect, useState } from "react";
import { Discussion } from "../../@types/Discussion";
import TextField from "../TextField";
import { UserProvider } from "../../Providers/UserProviders";
import { SimplifiedUser } from "../../@types/User";
import { AddFriend } from "./AddFriend";
import { DiscussionMembershipProvider } from "../../Providers/DiscussionsMembershipProvider";

type DiscussionAddFriendPropsType = {
  discussion: Discussion;
};

export default function DiscussionAddFriend(
  props: DiscussionAddFriendPropsType,
) {
  const { discussion } = props;
  const [friends, setFriends] = useState<SimplifiedUser[]>();
  const arr = Array.of(1, 2, 3, 4, 5, 6, 6, 7, 8, 6, 7, 6, 7, 6);
  useEffect(() => {
    UserProvider.getFriends().then((res) => {
      setFriends(res);
    });
  }, []);
  return (
    <div className="w-full flex flex-col h-full relative">
      <div className="p-3">
        <TextField placeholder="Search friends..." />
      </div>
      <div style={{ flex: "1 1 0" }} className="overflow-y-auto p-3">
        {friends &&
          friends.map((friend, index) => (
            <AddFriend
              key={friend.id + index}
              friend={{
                id: friend.id,
                username: friend.username,
                pfp: friend.pfp,
              }}
              onAddButtonClick={() => {
                DiscussionMembershipProvider.create(
                    {
                        discussion_id: discussion.id,
                        permission: "write",
                        user_id: friend.id
                    }
                );
              }}
            ></AddFriend>
          ))}
      </div>
    </div>
  );
}
