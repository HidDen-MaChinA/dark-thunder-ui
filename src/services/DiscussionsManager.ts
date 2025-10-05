import { Discussion } from "../@types/Discussion";
import { DiscussionsStoreType, useDiscussionsStore } from "../utils/DiscussionsStateManager";

export function useDiscussionsManager(){
    const store = useDiscussionsStore()
    return new DiscussionsManager(store);
}

export class DiscussionsManager{
    private discussionsStore : DiscussionsStoreType | null  = null;
    async discussionFetch(discussion: Discussion){
        // TODO: implement discussion fetch event
        return this.discussionsStore;
    }
    async discussionsFetch(page: number){
        // TODO: implement discussions fetch event        
        return this.discussionsStore;
    }
    constructor(store: DiscussionsStoreType){
        this.discussionsStore = store;
    }
}

export type DiscussionEvent =  "discussions:fetch" | "discussion:fetch"
