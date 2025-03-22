import { FormEvent, useEffect, useState } from "react";
import Button from "../Components/Login/Button";
import { EmailProvider } from "../Providers/EmailProvider";
import { useNavigate } from "react-router-dom";

export default function EmailValidation() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verificationCountDown, setVerificationCountDown] = useState<
    string | null
  >(null);
  const [email, setEmail] = useState<string>("");

  const verificationCodeInputOnChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const allLettersPattern = /[a-zA-Z]/g;
    if (e.target.value.match(allLettersPattern) == null) {
      setVerificationCode(e.target.value);
    }
  };

  const submitEventHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (verificationCountDown) {
      EmailProvider.verifyEmail({
        email: email,
        verification_code: verificationCode,
        verification_count_down: verificationCountDown,
      }).then((res) => {
        sessionStorage.setItem("dt-verified-at", res.verified_at);
        navigate("/user/register/finalisation");
      });
    }
  };

  useEffect(() => {
    const dtEmailVerify = sessionStorage.getItem("dt-email-verify");
    const dtVerificationCountDown = sessionStorage.getItem(
      "dt-verification-count-down",
    );

    if (!(dtEmailVerify && dtVerificationCountDown)) {
      navigate("/user/login");
    } else {
      setEmail(dtEmailVerify);
      setVerificationCountDown(dtVerificationCountDown);
    }
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="p-3 flex flex-col gap-3 rounded-xl border shadow-xl w-[400px]">
        <h1 className="text-lg">Email verification</h1>
        <p>
          We sent a code to <span className="text-blue-500">{email}</span>
        </p>
        <form onSubmit={submitEventHandler} action="">
          <input
            type="text"
            value={verificationCode}
            onChange={verificationCodeInputOnChangeEventHandler}
            placeholder="XXXXXX"
            maxLength={6}
            className="text-center border rounded-lg w-full text-black p-1"
          />
          <div className="flex">
            <Button>Confirm</Button>
          </div>
        </form>
      </div>
      <div className="absolute right-5 bottom-5">
        Already have an Account ? go back to{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </div>
    </div>
  );
}
