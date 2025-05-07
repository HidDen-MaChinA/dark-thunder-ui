import { SimplifiedUser } from "./User"

export type Friendship = {
    sender_user: SimplifiedUser
    receiver_user: SimplifiedUser
    id:string
    allowed: boolean
}