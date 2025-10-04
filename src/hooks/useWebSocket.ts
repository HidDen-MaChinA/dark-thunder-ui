export default function useWebSocket(url: string) {
  return new WebSocketManager(url);
}

class WebSocketManager {
  private callback = (event: MessageEvent) => {
    console.log(event);
  };
  private socket: WebSocket | null = null;
  private url: string = ""

  onMessage(callback: (event: MessageEvent) => void) {
    this.callback = callback;
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
  }

  constructor(url: string) {
    const newSocket = new WebSocket(url);
    newSocket.addEventListener("message", this.callback);
    this.url = url;
    this.socket = newSocket;
  }
}
