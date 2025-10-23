import useWebSocket, { WebSocketManager } from "../hooks/useWebSocket";

export function useRealtimeConnexionManager(url: string){
    return new DarkthunderRealtimeConnexionManager(useWebSocket(url))
}


export interface RealtimeConnexionManager  {
    attemptConnexion : (dailyToken: string)=>RealtimeConnexionManager
    onMessage: (callback: (event: MessageEvent)=>void)=>RealtimeConnexionManager
    cutConnexion: ()=>void
}

export class DarkthunderRealtimeConnexionManager implements RealtimeConnexionManager{
    private webSocketManager: WebSocketManager;
    constructor(webSocketManager: WebSocketManager){
        this.webSocketManager = webSocketManager;
    }
    attemptConnexion(dailyToken: string){
        this.webSocketManager.withQuery("dailyToken", dailyToken).openConnection();
        return this;
    }
    onMessage(callback: (event:MessageEvent)=>void){
        this.webSocketManager.onMessage(callback);
        return this;
    }
    cutConnexion(){
       this.webSocketManager.removeSocket() 
    };
}