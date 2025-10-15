import { Message } from "../@types/Message"
import { CreateUser, UserAuthentified } from "../@types/User"
import { AxiosClient } from "../AxiosClient"

type MessageProviderType= {
    create: (arg:{
        value: string,
        discussion_id: string
    }) => Promise<number>

    update: (arg:{
        id: string,
        value: string
    }) => Promise<number>

    delete: (arg:{
        id: string,
    }) => Promise<number>
    
    getLatestMessages: (arg: {
        page: number,
        discussion_id: string
    }) => Promise<{list:Message[], discussion_id: string}>

}

export const MessageProvider : MessageProviderType= {
    create: (arg) => {
        return AxiosClient.post("/api/discussion/message/create", arg).then(_=>_.data);
    },

    update: (arg) => {
        return AxiosClient.post("/api/discussion/message/update", arg).then(_=>_.data);
    },

    delete: (arg) => {
        return AxiosClient.post("/api/discussion/message/delete", arg).then(_=>_.data);
    },

    getLatestMessages: async (arg)=>{
        let list = await AxiosClient.get(`/api/discussion/messages?page=${arg.page}&discussion_id=${arg.discussion_id}`).then(_=>_.data);
        return {list: list, discussion_id: arg.discussion_id}
    }
} 