import { create } from "zustand";

export type SnackBarStoreType = {
    messages : SnackBarMessageType[],
    addMessage : (message: SnackBarMessageType)=>void,
    flushMessages: ()=>void
}

export type SnackBarMessageType = {
    value: string,
    type: "ERR" | "INFO"
}

export const useSnackBarStore = create<SnackBarStoreType>((set)=>({
    messages: [],
    addMessage: (message: SnackBarMessageType)=>{
        set((state)=>{
            const newState = {...state};
            newState.messages.push(message);
            return newState;
        })
    },
    flushMessages: ()=>{
        set((state)=>{
            const newState = {...state}
            newState.messages = [];
            return newState;
        })
    }
}));
