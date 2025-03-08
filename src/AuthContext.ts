import React from "react";
import { UserAuthentified } from "./@types/User";

type AuthProviderContextType = {
    user: UserAuthentified
}

const Context = React.createContext<AuthProviderContextType>({
    user: { email: "", PFP: "", username: "" },
});


export default Context;