import { Discussion } from "../@types/Discussion"
import { AxiosClient } from "../AxiosClient"

type DiscussionProviderType= {
    create: (arg:{
       name: string,
       message_restriction_regex?: string 
    }) => Promise<Discussion>,

    update: (arg:{
        name: string,
        id: string,
        message_restriction_regex?: string
    }) => Promise<number>,
    
    createDiscussionWithAnotherUser: (arg:{
        id: string,
        discussion_name: string
    }) => Promise<Discussion>,

    getAllDiscussions: (arg:{
        page: number
    }) => Promise<{
        items: Discussion[],
        per_page: number,
        total: number
    }>,

    getDiscussionById:(arg:{id:string}) => Promise<Discussion>
}

export const DiscussionProvider : DiscussionProviderType= {
    create : (arg)=>{
        return AxiosClient.post("/api/discussion/create", arg).then(_=>_.data);
    },

    update : (arg)=>{
        return AxiosClient.post("/api/discussion/update", arg).then(_=>_.data);
    },

    createDiscussionWithAnotherUser: (arg)=>{
        return AxiosClient.post("/api/discussion/create/user", arg).then(_=>_.data);
    },
    
    getAllDiscussions: (arg)=>{
        return AxiosClient.get(`/api/discussions?page=${arg.page}`).then(_=>_.data);
    },
    
    getDiscussionById: (arg)=>{
        return AxiosClient.get(`/api/discussion?id=${arg.id}`).then(_=>_.data);
    }
} 