import { Discussion } from "./Discussion";
import { UserAuthentified } from "./User";

export type Message = {
  discussion_id: string;
  id: number;
  user_id: string;
  user: UserAuthentified
  discussion: Discussion
  value: string;
  created_at: string;
  updated_at: string;
};