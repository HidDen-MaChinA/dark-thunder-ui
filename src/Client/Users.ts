import { CreateUser, UserAuthentified } from "../@types/User"
import { axiosClient } from "../axiosClient"

export type UserClientType= {
    crupdate: (arg:CreateUser) => Promise<UserAuthentified>
    quit: (arg: UserQuit) => Promise<UserAuthentified>
}

export type UserQuit = {
    password: string
    email: string
    reason: string
}

export const auth:UserClientType= {
    quit: async (arg)=>{
        return axiosClient.post("/user/quit", arg).then((res)=>{
            return res.data
        })
    },
    crupdate: async (arg)=>{
        return axiosClient.post("/user/quit", arg).then((res)=>{
            return res.data
        })
    }
} 