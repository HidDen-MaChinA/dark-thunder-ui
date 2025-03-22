import { AxiosClient } from "../AxiosClient";

type EmailProviderType = {
  sendVerificationCode: (
    email: string,
  ) => Promise<{ verificationCountDown: string }>;

  verifyEmail: (arg: {
    verification_code: string;
    email: string;
    verification_count_down: string;
  }) => Promise<{ verified_at: string }>;
};

export const EmailProvider: EmailProviderType = {
  sendVerificationCode: async (email) => {
    const verificationCountDown = await AxiosClient
      .post("/api/guest/email/sendVerificationCode", { email: email })
      .then((res) => res.data);
    return verificationCountDown;
  },

  verifyEmail: async (arg) => {
    const verifiedAt = await AxiosClient
      .post("/api/guest/email/verify", arg)
      .then((res) => res.data);
    return verifiedAt;
  },
};
