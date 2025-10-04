import { DiscussionsStoreType, useDiscussionsStore } from "../utils/DiscussionsStateManager";

export function useDiscussionsManager(){
    const store = useDiscussionsStore()
    return new DiscussionsManager(store);
}

export class DiscussionsManager{
    private discussionsStore : DiscussionsStoreType | null  = null;
    private discussionFetch(){
        // TODO: implement discussion fetch event
    }
    private discussionsFetch(){
        // TODO: implement discussions fetch event        
    }
    registerEventListeners(){
        window.addEventListener("discussions:fetch", this.discussionsFetch)
        window.addEventListener("discussion:fetch", this.discussionFetch)

    }
    dispatchEvent(eventName: DiscussionEvent){
        const event = new Event(eventName, {cancelable: true});
        window.dispatchEvent(event);
    }
    disableEventListeners(){
       window.removeEventListener("discussions:fetch", this.discussionsFetch); 
       window.removeEventListener("discussions:fetch", this.discussionFetch); 
    }
    constructor(store: DiscussionsStoreType){
        this.discussionsStore = store;
    }
}

export type DiscussionEvent =  "discussions:fetch" | "discussion:fetch"
