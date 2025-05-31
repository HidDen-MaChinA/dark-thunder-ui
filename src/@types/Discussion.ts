import { UserAuthentified } from "./User"

export type Discussion = {
    id: string
    name: string
    message_restriction_regex: string,
    image: string
    creator: UserAuthentified
}