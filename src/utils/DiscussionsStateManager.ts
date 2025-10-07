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
            console.log(notInside)
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
            const newState = {...state};
            const newStatesCurrentDiscussionMessage = newState.discussions[discussionIndex].messages;
            const newMessages = [...mergeMessages(newStatesCurrentDiscussionMessage, messages)];
            newState.discussions[discussionIndex].messages = newMessages;
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
    const lastMessageRecorded = olds[olds.length - 1];
    let index = 0;
    for(let i=0;i<news.length;i++){
        if(news[i].id <= lastMessageRecorded.id){
            console.log(news[i]);
            index = i;
            break;
        }
    }
    const newMessagesRecorded = news.slice(0, index);
    if(newMessagesRecorded.length === 0){
        return olds;
    }
    const newMessages = [...olds]
    newMessages.push(...newMessagesRecorded);
    return newMessages;
}
