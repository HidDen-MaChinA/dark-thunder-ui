import { SnackBarMessageType, SnackBarStoreType } from "../utils/SnackBarStateManager";

export class SnackBarManager{
    private store:SnackBarStoreType|undefined;
    private timeoutID = 0;
    notifyUser(message: SnackBarMessageType){
        this.store?.addMessage(message);
        if(this.timeoutID !== 0){
            clearTimeout(this.timeoutID);
        }
        const tempID = setTimeout(()=>{
            this.store?.flushMessages();
            this.timeoutID = 0;
        }, 10000);
        this.timeoutID = tempID;
    }
    constructor(store: SnackBarStoreType){
       this.store = store; 
    }
}