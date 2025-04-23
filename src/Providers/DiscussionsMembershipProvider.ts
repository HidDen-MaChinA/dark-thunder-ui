import { Discussion } from "../@types/Discussion";
import { DiscussionMembership } from "../@types/DiscussionMembership";
import { UserAuthentified } from "../@types/User";
import { AxiosClient } from "../AxiosClient";

type DiscussionMembershipProviderType = {
  create: (arg: {
    discussion_id: string;
    user_id: string;
    permission: "read" | "write";
  }) => Promise<DiscussionMembership>,

  delete: (arg: {
    discussion_id: string;
    user_id: string;
  }) => Promise<{message: string}>,

  update: (arg: {
    id: string;
    discussion_id: string;
    user_id: string;
    permission: "read" | "write" | "mod";
  }) => Promise<number>,

  getAllMembersOfDiscussion: (arg: {
    discussion_id: string,
    page: number
  }) => Promise<{
    items: UserAuthentified[],
    total: number
  }>
};

export const DiscussionMembershipProvider: DiscussionMembershipProviderType = {
  create: (arg) => {
    return AxiosClient.post("/api/discussion/member/create", arg).then((_) => _.data);
  },
  
  delete: (arg) => {
    return AxiosClient.post("/api/discussion/member/delete", arg).then((_) => _.data);
  },

  update: (arg) => {
    return AxiosClient.post("/api/discussion/permission/update", arg).then((_) => _.data);
  },

  getAllMembersOfDiscussion: (arg) => {
    return AxiosClient.get(`/api/discussion/members?page=${arg.page}&discussion_id=${arg.discussion_id}`).then(
      (_) => _.data,
    );
  },
};
