import { UserAuthentified } from "./User"

export type Discussion = {
    id: string
    name: string
    message_restriction_regex: string,
    creator: UserAuthentified
}