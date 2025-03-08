import { UserAuthentified } from "../@types/User"
import { axiosClient } from "../axiosClient"

export type AuthClientType = {
    logout: () => Promise<boolean>
    login: (arg: LoginUser) => Promise<UserAuthentified>
    whoami: () => Promise<UserAuthentified>
}

export type LoginUser = {
    email: string
    password: string
}

export const auth:AuthClientType = {
    logout: async ()=>{
        return axiosClient.post("/logout").then(()=>{
            return true
        }) 
       },
    login: async (arg: LoginUser)=>{
        return axiosClient.post<UserAuthentified>("/logout", arg).then((res)=>{
            return res.data;
        })    },
    whoami: async ()=>{
        return axiosClient.post<UserAuthentified>("/logout").then((res)=>{
            return res.data;
        })    }
} 