import { Discussion } from "../@types/Discussion"
import { AxiosClient } from "../AxiosClient"

type DiscussionProviderType= {
    create: (arg:{
       name: string,
       messageRestrictionRegex?: string 
    }) => Promise<Discussion>,

    update: (arg:{
        name: string,
        id: string,
        messageRestrictionRegex?: string
    }) => Promise<number>,
    
    createDiscussionWithAnotherUser: (arg:{
        userId: string,
        discussionName: string
    }) => Promise<Discussion>,

    getAllDiscussions: (arg:{
        page: number
    }) => Promise<{
        items: Discussion[],
        total: number
    }>
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
        return AxiosClient.get(`/api/discussions/created?page=${arg.page}`).then(_=>_.data);
    },

} 