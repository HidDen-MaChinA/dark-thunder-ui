import { UserAuthentified } from "../@types/User";
import { AxiosClient } from "../AxiosClient";


export type LoginUser = {
  email: string;
  password: string;
};

export type AuthProviderType= {
  logout: () => Promise<boolean>;
  login: (arg: LoginUser) => Promise<{token: string}>;
  whoami: () => Promise<UserAuthentified>;
};

export const AuthProvider: AuthProviderType= {
  logout: async () => {
    return AxiosClient.post("/api/auth/logout").then(() => {
      return true;
    });
  },

  login: async (arg) => {
    const token = await AxiosClient
      .post<{token: string}>("/api/guest/auth/login", arg)
      .then((res) => {
        return res.data;
      });
    return token;
  },
  
  whoami: async () => {
    const userAuthentified = await AxiosClient
      .get<UserAuthentified>("/api/auth/whoami")
      .then((res) => {
        return res.data;
      });
    return userAuthentified;
  },
};
