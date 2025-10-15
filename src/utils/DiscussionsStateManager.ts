import { Discussion } from '../@types/Discussion';
import { Message } from '../@types/Message';
import { UserAuthentified } from '../@types/User';
import { DiscussionMapper } from '../mappers/DiscussionMapper';
import { create } from "zustand";


export type DiscussionsStoreDiscussion = {
    id: string
    name: string
    message_restriction_regex: string,
    image: string
    creator: UserAuthentified
    messages: Message[]
}

export type DiscussionsStoreType = {
    discussions: DiscussionsStoreDiscussion[]
    addMessagesToDiscussion: (messages: Message[], discussion: Discussion, callback?: ()=>void)=>void
    // removeMessageFromDiscussion: (message: Message)=>void
    addDiscussion: (discussion: Discussion)=>void
    addDiscussions: (discussions: Discussion[])=>void
    removeDiscussion: (discussion: Discussion)=>void
}



export const useDiscussionsStore = create<DiscussionsStoreType>((set)=>({
    discussions: [],
    addDiscussion: (discussion)=>{
        set((state)=>{
            const index = state.discussions.findIndex(_=>_.id===discussion.id);
            if(index > 0){
                return state;                    
            }
            const mapper = new DiscussionMapper();
            const newState = {...state};
            newState.discussions.push(mapper.discussionToDiscussionStoreDiscussion(discussion));
            return newState;
        })
    },
    addDiscussions: (discussions)=>{
        set((state)=>{
            const notInside = discussions.filter((discussion)=>{
                const index = state.discussions.findIndex(_=>_.id === discussion.id);
                return index < 0;
            })
            const newState = {...state}
            const mapper = new DiscussionMapper();
            const mappedNotInside = notInside.map(mapper.discussionToDiscussionStoreDiscussion);
            newState.discussions.push(...mappedNotInside)
            return newState;
        })

    },
    removeDiscussion: (discussion)=>{
        set((state)=>{
            const index = state.discussions.findIndex(_=>_.id===discussion.id);
            if(index < 0){
                return state;                    
            }
            const newState = {...state};
            newState.discussions.splice(index, 1);
            return newState; 
        })        
    },
    addMessagesToDiscussion: (messages, discussion, callback = ()=>{})=>{
        set((state)=>{
            const discussionIndex = state.discussions.findIndex(_=>_.id===discussion.id);
            if(discussionIndex < 0){
                callback()
                return state;
            }
            let newState = {...state};
            // const newStatesCurrentDiscussionMessage = newState.discussions[discussionIndex].messages;
            // const newMessages = mergeMessages(newStatesCurrentDiscussionMessage, messages.sort((a,b)=>b.id - a.id));
            newState.discussions[discussionIndex].messages = messages;
            // console.log(newState)
            return newState;
        })
    }
    // removeMessageFromDiscussion: (message)=>{}
}))

function mergeMessages(olds: Message[], news: Message[]){
    if(olds.length  === 0){
        return news;        
    }
    if(news.length === 0){
        return olds
    }
    const lastMessageRecorded = olds[0];
    let index = 0;
    for(let i=0;i<news.length;i++){
        if(news[i].id <= lastMessageRecorded.id){
            index = i;
            break;
        }
    }
    if(index === 0){
        return olds;
    }
    const newMessagesRecorded = news.slice(0,index);
    const newMessages = [...olds]
    newMessages.unshift(...newMessagesRecorded);
    return newMessages.sort((a,b)=>a.id-b.id);
}
