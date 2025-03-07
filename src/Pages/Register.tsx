import { useState } from "react";
import Button from "../Components/Login/Button";

export default function Register() {
  const [email, setEmail] = useState({ value: "", ok: true });
  const expression = /<|>/g;
  const emailChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputIsValid(e.target.value, expression)) {
      setEmail({ value: e.target.value, ok: true });
    } else {
      setEmail({ value: e.target.value, ok: false });
    }
  };

  return (
    <div>
      <div className="flex flex-row h-[100vh] w-[100vw]">
        <div className="w-1/2 bg-black flex justify-center items-center">
          <div className="items-center flex flex-col">
            <div className="w-[100px] h-[100px] relative">
              <img src="/images/icons/source-code-white.svg" alt="" className="w-full h-full" />
            </div>
            <h1 className="w-full text-center text-xl text-white">Dark Thunder</h1>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="px-5 bg-white shadow-lg rounded-xl flex-col shadow-gray-600 flex gap-2">
            <h1 className="text-2xl w-full text-center py-4">Register</h1>
            <p>Email</p>
            <div>
              <input
                type="text"
                className="rounded-md p-3 py-2 w-full border"
                onChange={emailChangeEventHandler}
                style={{ border: email.ok ? "" : "1px solid red" }}
              />
              <p className="text-blue-500 ">* we need to verify your email first</p>
            </div>
            <div className="p-3">
              <Button >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputIsValid(arg: string, expression: RegExp): Boolean {
  return arg.match(expression) ? false : true;
}
