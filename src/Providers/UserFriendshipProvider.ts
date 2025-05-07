import { Friendship } from "../@types/Friendships"
import { AxiosClient } from "../AxiosClient"

type UserFriendshipProviderType = {
    create: (args:{user_id:string})=>Promise<Friendship>
    delete: (args:{friendship_id: string})=>Promise<number>
    allow: (args:{friendship_id:string})=>Promise<number>
    getAllReceived: (args:{page: number})=>Promise<Friendship[]>
    getAllSent: (args:{page: number})=>Promise<Friendship[]>
}

export const UserFriendshipProvider : UserFriendshipProviderType = {
    create: (args)=>{
        return AxiosClient.post<Friendship>("/api/user/friendship/create", args).then((res)=>{
            return res.data
        })
    },

    delete: (args)=>{
        return AxiosClient.post<number>("/api/user/friendship/delete", args).then((res)=>{
            return res.data
        })
    },

    allow: (args)=>{
        return AxiosClient.post<number>("/api/user/friendship/allow", args).then((res)=>{
            return res.data
        })
    },

    getAllReceived: (args)=>{
        return AxiosClient.get<Friendship[]>(`/api/user/friendships/received?page=${args.page}`).then((res)=>{
            return res.data
        })
    },

    getAllSent: (args)=>{
        return AxiosClient.get<Friendship[]>(`/api/user/friendships/sent?page=${args.page}`).then((res)=>{
            return res.data
        })
    }
}