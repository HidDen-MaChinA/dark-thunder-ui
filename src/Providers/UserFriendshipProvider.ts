import { AxiosClient } from "../AxiosClient"

type UserFriendshipProviderType = {
    create: (user_id:string)=> any
}

export const UserFriendshipProvider : UserFriendshipProviderType = {
    create: (user_id)=>{
        AxiosClient.post("/api/user/friendship/create", {
            "user_id" : user_id
        })
    }
}