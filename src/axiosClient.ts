import axios from "axios";

const client = axios.create({"baseURL": "http://localhost:8000"})

client.interceptors.request.use((config)=>{
    let result:any; 
    if(config.url){
        result = config.url.match("/api/guest");
    }
    if(result){
        return config;
    }
    const token = localStorage.getItem("dt-token-session-auth");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config
})

export const AxiosClient = client;
