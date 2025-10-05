import { Discussion } from "../@types/Discussion";
import { DiscussionProvider } from "../Providers/DiscussionProvider";
import { MessageProvider } from "../Providers/MessageProvider";
import { DiscussionsStoreType, useDiscussionsStore } from "../utils/DiscussionsStateManager";

export function useDiscussionsManager(){
    const store = useDiscussionsStore()
    return new DiscussionsManager(store);
}

export class DiscussionsManager{
    private discussionsStore : DiscussionsStoreType | null  = null;
    /**
     * 
     * the callback is used to handle the case when there is no
     * discussion found in the store.
     *  
     * while the discussion will always be there because of how I
     * wrote the code, i still add it just in case. 
     */
    async discussionFetch(discussion: Discussion, page: number = 1, callback = ()=>{}){
        MessageProvider.getLatestMessages({
            discussion_id: discussion.id,
            page: page
        }).then((result)=>{
            this.discussionsStore?.addMessagesToDiscussion(result.list, discussion, callback)
        })
        // TODO: implement discussion fetch event
        return this.discussionsStore;
    }
    async discussionsFetch(page: number){
        DiscussionProvider.getAllDiscussions({page: page}).then((result)=>{
            this.discussionsStore?.addDiscussions(result.items)
        });
        // TODO: implement discussions fetch event        
        return this.discussionsStore;
    }
    constructor(store: DiscussionsStoreType){
        this.discussionsStore = store;
    }
}

export type DiscussionEvent =  "discussions:fetch" | "discussion:fetch"
