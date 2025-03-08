import React, { useEffect, useState } from "react";
import { UserAuthentified } from "./@types/User";
import { authClient } from "./Client/Auth";
import Context from "./AuthContext";


export default function ProtectedRoute(props:{children?: React.ReactNode}) {
  const [currentUser, setCurrentUser] = useState<UserAuthentified>();
  useEffect(()=>{
    const token = sessionStorage.getItem("token")
    if(token){
        authClient.whoami(token).then((res)=>{
            setCurrentUser(res)
        }).catch(()=>{
            //redirection
        })
    }
  })
  return (
    <>
    {
        currentUser ? <Context.Provider value={{user: currentUser}}>{props.children}</Context.Provider> : <div>loading...</div>
    }
    </>
  );
}
