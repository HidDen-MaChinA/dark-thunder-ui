import { toFormData } from "axios"
import { CreateUser, UserAuthentified, UserFriend } from "../@types/User"
import { AxiosClient } from "../AxiosClient"

export type UserClientType= {
    create: (arg:CreateUser) => Promise<UserAuthentified>
    update: (arg:CreateUser) => Promise<UserAuthentified>
    quit: (arg: UserQuit) => Promise<UserAuthentified>
    getFriends: () => Promise<UserFriend[]>
    getNonFriends: () => Promise<UserAuthentified[]>
    getFriendsNotInDiscussion: (arg: {discussionId:string}) => Promise<UserAuthentified[]>
}

export type UserQuit = {
    password: string
    email: string
    reason: string
}

export const UserProvider :UserClientType= {
    quit: async (arg)=>{
        return AxiosClient.post("/user/quit", arg).then((res)=>{
            return res.data
        })
    },

    create: async (arg)=>{
        const formData = toFormData(arg);
        const createdUser = await AxiosClient.post("/api/guest/user/create", formData, {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            return res.data
        })
        return createdUser;
    },
    
    update: async (arg)=>{
        const createdUser = await AxiosClient.post("/api/user/update", arg).then((res)=>{
            return res.data
        })
        return createdUser;
    },

    getFriends: async ()=> {
        const friends = await AxiosClient.get<UserFriend[]>("/api/user/friends").then((res)=>{
            return res.data
        })
        return friends;
    },

    getNonFriends: async ()=> {
        const nonFriends = await AxiosClient.get<UserAuthentified[]>("/api/user/nonFriends").then((res)=>{
            return res.data
        })
        return nonFriends;
    },

    getFriendsNotInDiscussion: async (arg: {discussionId: string}) => {
        const friends = await AxiosClient.get<UserAuthentified[]>(`/api/user/friends/notInDiscussion?discussion_id=${arg.discussionId}`).then(_=>_.data);
        return friends;
    }
} 