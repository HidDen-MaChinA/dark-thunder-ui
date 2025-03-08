import { UserAuthentified } from "../@types/User";
import { axiosClient } from "../axiosClient";

export type AuthClientType = {
  logout: () => Promise<boolean>;
  login: (arg: LoginUser) => Promise<UserAuthentified>;
  whoami: (userSession: string) => Promise<UserAuthentified>;
};

export type LoginUser = {
  email: string;
  password: string;
};

export const authClient: AuthClientType = {
  logout: async () => {
    return axiosClient.post("/logout").then(() => {
      return true;
    });
  },
  login: async (arg: LoginUser) => {
    return axiosClient.post<UserAuthentified>("/logout", arg).then((res) => {
      return res.data;
    });
  },
  whoami: async (userSession) => {
    return axiosClient.get<UserAuthentified>("/logout", {headers: {Authorization: userSession}}).then((res) => {
      return res.data;
    });
  },
};
