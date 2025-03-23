import { Discussion } from "./Discussion"
import { UserAuthentified } from "./User"

export type Message = {
    id: number
    value: string
    user: UserAuthentified
    discussion: Discussion
}