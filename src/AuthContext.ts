import React from "react";
import { UserAuthentified } from "./@types/User";

type AuthProviderContextType = {
    user: UserAuthentified
}

const Context = React.createContext<AuthProviderContextType>({
  user: {
    email: "",
    pfp: "",
    birthdate: "",
    daily_discussions_token: "",
    username: "",
    firstname: "",
    id: "",
    lastname: ""
  },
});


export default Context;