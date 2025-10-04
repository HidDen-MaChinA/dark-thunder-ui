import { Discussion } from "../@types/Discussion";
import { DiscussionsStoreDiscussion } from "../utils/DiscussionsStateManager";

export class DiscussionMapper{
    discussionToDiscussionStoreDiscussion(discussion: Discussion) : DiscussionsStoreDiscussion{
        const newDiscussion : DiscussionsStoreDiscussion = {
            ...discussion,
            messages: []
        }
        return newDiscussion;
    }
    constructor(){
        
    }
}