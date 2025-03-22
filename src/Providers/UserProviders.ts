import { CreateUser, UserAuthentified } from "../@types/User"
import { AxiosClient } from "../AxiosClient"

export type UserClientType= {
    create: (arg:CreateUser) => Promise<UserAuthentified>
    update: (arg:CreateUser) => Promise<UserAuthentified>
    quit: (arg: UserQuit) => Promise<UserAuthentified>
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
        const createdUser = await AxiosClient.post("/api/guest/user/create", arg).then((res)=>{
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
} 