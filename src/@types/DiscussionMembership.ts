import { Discussion } from "./Discussion"
import { UserAuthentified } from "./User"

export type DiscussionMembership = {
    id: string
    add_date: string
    permission: string
    user: UserAuthentified
    discussion: Discussion
}