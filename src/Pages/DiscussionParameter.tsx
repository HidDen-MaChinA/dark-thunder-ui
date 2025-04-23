import React, { SetStateAction, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "../Components/TextField";
import Loading from "../Components/Loading";
import { Discussion } from "../@types/Discussion";
import Button from "../Components/Login/Button";
import { DiscussionProvider } from "../Providers/DiscussionProvider";
import { SimplifiedUser } from "../@types/User";
import { DiscussionMembershipProvider } from "../Providers/DiscussionsMembershipProvider";
import { UserProvider } from "../Providers/UserProviders";
import { UsersList, UsersListItem } from "../Components/UsersList";

export default function DiscussionParameter() {
  const navigate = useNavigate();
  const [currentDiscussion, setCurrentDiscussion] = useState<Discussion | null>(
    null,
  );
  const [shouldFetch, setShouldFetch] = useState([]);
  const [members, setMembers] = useState<SimplifiedUser[] | null>(null);
  const [friends, setFriends] = useState<SimplifiedUser[] | null>(null);
  const { discussionId } = useParams();
  useEffect(() => {
    if (discussionId === null) {
      navigate("/discussions");
    } else {
      DiscussionProvider.getDiscussionById({ id: discussionId || "" })
        .then(setCurrentDiscussion)
        .then(() => {
          DiscussionMembershipProvider.getAllMembersOfDiscussion({
            discussion_id: discussionId || "",
            page: 0,
          }).then((members) => {
            setMembers(members.items);
          });
          UserProvider.getFriendsNotInDiscussion({
            discussionId: discussionId || "",
          }).then((friends) => {
            setFriends(friends);
          });
        });
    }
  }, [shouldFetch]);
  return (
    <Loading loading={currentDiscussion === null}>
      {currentDiscussion && (
        <div className="">
          <div className="flex items-center">
          
            <UpdateDiscussion setShouldFetch={setShouldFetch} currentDiscussion={currentDiscussion}/>
            <div className="w-full relative flex-col flex items-center">
              <div className="w-[350px] h-[350px] shadow-lg rounded-full border">
                <img src="/images/icons/test.png" alt="" />
              </div>
              <h1 className="text-4xl mt-5 text-[#2e2e2e]">
                {currentDiscussion.name}
              </h1>
            </div>

            <div className="flex p-4 gap-3 flex-col">
              <MemberList
                setShouldFetch={setShouldFetch}
                discussionId={discussionId || ""}
                members={members}
              />
              <AddFriends
                setShouldFetch={setShouldFetch}
                discussionId={discussionId || ""}
                friends={friends}
              />
            </div>
          </div>
        </div>
      )}
    </Loading>
  );
}

function UpdateDiscussion(props: { currentDiscussion: Discussion, setShouldFetch: React.Dispatch<SetStateAction<never[]>> }) {
  const { currentDiscussion, setShouldFetch } = props;
  const [name, setName] = useState("");
  const [messagesRestrictionRegex, setMessagesRestrictionRegex] = useState("");
  
  const submitEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    DiscussionProvider.update({
      id: currentDiscussion.id,
      name: name,
      message_restriction_regex: messagesRestrictionRegex
    }).then(()=>{
      setShouldFetch([])
    })
  }
  return (
    <div className="p-3 ml-6 bg-white w-[400px] h-[300px] rounded-lg relative z-30 border">
      <form action="" onSubmit={submitEventHandler}>
      <div className="flex">
        <div className="flex-1">
          <div className="w-full">
            <TextField
              label="Discussion name"
              onChange={(e)=>{
                setName(e.target.value)
              }}
              defaultValue={currentDiscussion.name}
            ></TextField>
            <TextField label="Discussion cover" type="file"></TextField>
            <TextField
              onChange={(e)=>{
                setMessagesRestrictionRegex(e.target.value)
              }}
              placeholder="/something/g"
              label="Messages restriction (regex)"
              defaultValue={currentDiscussion.message_restriction_regex}
            ></TextField>
          </div>
          <div className="mt-4">
            <Button>Modify</Button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

function MemberList(props: {
  members: SimplifiedUser[] | null;
  discussionId: string;
  setShouldFetch: React.Dispatch<SetStateAction<never[]>>;
}) {
  const { members, discussionId, setShouldFetch } = props;
  return (
    <div className="p-3 bg-white h-[300px] w-[300px] flex flex-col gap-2 rounded-lg relative border">
      <h3 className="px-2 text-xl">Members</h3>
      <TextField placeholder="search for a member" />
      <UsersList>
        {
          <Loading loading={members === null}>
            {members &&
              members.map((member, index) => (
                <UsersListItem
                  key={member.id + index}
                  name={member.username}
                  buttons={[
                    {
                      text: {
                        color: "white",
                        value: "Kick",
                      },
                      clickEventHandler: () => {
                        DiscussionMembershipProvider.delete({
                          discussion_id: discussionId,
                          user_id: member.id,
                        }).then(() => {
                          setShouldFetch([]);
                        });
                      },
                      bgColor: "red",
                    },
                  ]}
                />
              ))}
          </Loading>
        }
      </UsersList>
    </div>
  );
}

function AddFriends(props: {
  friends: SimplifiedUser[] | null;
  discussionId: string;
  setShouldFetch: React.Dispatch<React.SetStateAction<never[]>>;
}) {
  const { friends, discussionId, setShouldFetch } = props;
  return (
    <div className="p-3 bg-white h-[300px] w-[300px] flex flex-col gap-2 rounded-lg relative border">
      <h3 className="px-2 text-xl">Add friends to discussion</h3>
      <TextField placeholder="search for a member" />
      <UsersList>
        {
          <Loading loading={friends === null}>
            {friends &&
              friends.map((friend, index) => (
                <UsersListItem
                  key={friend.id + index}
                  name={friend.username}
                  img={"/images/icons/web.svg"}
                  buttons={[
                    {
                      text: {
                        color: "white",
                        value: "Add",
                      },
                      bgColor: "blue",
                      clickEventHandler: () => {
                        DiscussionMembershipProvider.create({
                          permission: "write",
                          discussion_id: discussionId,
                          user_id: friend.id,
                        }).then(() => {
                          setShouldFetch([]);
                        });
                      },
                    },
                  ]}
                />
              ))}
          </Loading>
        }
      </UsersList>
    </div>
  );
}
