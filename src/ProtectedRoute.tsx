import React, { useEffect, useState } from "react";
import { UserAuthentified } from "./@types/User";
import { AuthProvider } from "./Providers/AuthProvider";
import Context from "./AuthContext";
import { useNavigate } from "react-router-dom";


export default function ProtectedRoute(props:{children?: React.ReactNode}) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserAuthentified>();
  useEffect(()=>{
    const token = localStorage.getItem("dt-token-session-auth")
    if(token){
        AuthProvider.whoami().then((res)=>{
            setCurrentUser(res)
        }).catch(()=>{
            console.log("not allowed")
            navigate("/user/login");
            //redirection
        })
    }else{
      navigate("/user/login");
    }
  }, [])
  return (
    <>
    {
        currentUser ? <Context.Provider value={{user: currentUser}}>{props.children}</Context.Provider> : <div>loading...</div>
    }
    </>
  );
}
