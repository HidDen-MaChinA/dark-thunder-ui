export default function useWebSocket(url: string) {
  return new WebSocketManager(url);
}

export class WebSocketManager {
  private callback = (event: MessageEvent) => {
    console.log(event);
  };
  private socket: WebSocket | null = null;
  private url: string = ""

  onMessage(callback: (event: MessageEvent) => void) {
    if(this.socket){
      this.socket.removeEventListener("message", this.callback);
    }
    this.callback = callback;
    this.socket?.addEventListener('message', this.callback);
  }

  removeSocket() {
    if (this.socket) {
      this.socket.removeEventListener("message", this.callback);
      this.socket.close();
    }
  }
  
  refreshConnection() {
    this.removeSocket();
    const newSocket = new WebSocket(this.url);
    newSocket.addEventListener("message", this.callback);
    this.socket = newSocket;
    return this;
  }

  openConnection () {
    if(this.socket !== null){
      return this;
    }
    const newSocket = new WebSocket(this.url);
    this.socket = newSocket;
    newSocket.addEventListener("message", this.callback);
    this.socket.onerror = ()=>{
      this.refreshConnection();
    };
    return this;
  }

  constructor(url: string) {
    this.url = url;
  }
}
