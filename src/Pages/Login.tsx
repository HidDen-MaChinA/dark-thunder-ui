import { useState } from "react";
import Button from "../Components/Login/Button";

export default function Login() {
  const [email, setEmail] = useState({ value: "", ok: true });
  const [password, setPassword] = useState({ value: "", ok: true });
  const expression = /<|>/g;
  const emailChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputIsValid(e.target.value, expression)) {
      setEmail({ value: e.target.value, ok: true });
    } else {
      setEmail({ value: e.target.value, ok: false });
    }
  };

  const passwordChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (inputIsValid(e.target.value, expression)) {
      setPassword({ value: e.target.value, ok: true });
    } else {
      setPassword({ value: e.target.value, ok: false });
    }
  };

  return (
    <div>
      <div className="flex flex-row h-[100vh] w-[100vw]">
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-[100px] h-[100px] relative">
            <img src="/vite.svg" alt="" className="w-full h-full" />
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="p-3 bg-white shadow-lg rounded-xl flex-col flex gap-2">
            <p>Email</p>
            <input
              type="text"
              className="rounded-md p-3 py-2 w-full border"
              onChange={emailChangeEventHandler}
              style={{ border: email.ok ? "" : "1px solid red" }}
            />
            <p>Password</p>
            <input
              type="text"
              className="rounded-md p-3 py-2 w-full border"
              onChange={passwordChangeEventHandler}
              style={{ border: password.ok ? "" : "1px solid red" }}
            />
            <Button></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputIsValid(arg: string, expression: RegExp): Boolean {
  return arg.match(expression) ? false : true;
}
