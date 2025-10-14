import { useState } from "react";
import Button from "../Components/Login/Button";
import { AuthProvider } from "../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
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
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (inputIsValid(e.target.value, expression)) {
      setPassword({ value: e.target.value, ok: true });
    } else {
      setPassword({ value: e.target.value, ok: false });
    }
  };
  
  const submitEventHandler = (event: React.FormEvent<HTMLFormElement>)=>{
  event.preventDefault();
    AuthProvider.login({email: email.value, password: password.value}).then((res)=>{
      localStorage.setItem("dt-token-session-auth",res.token);
      console.log(res);
      navigate("/discussions");
    })
  }

  return (
    <div>
      <div className="flex flex-row h-[100vh] w-[100vw]">
        <div className="w-1/2 flex justify-center items-center">
          <div className="items-center flex flex-col">
            <div className="w-[150px] h-[150px] relative">
              <img
                src="/images/logo.png"
                alt=""
                className="w-full h-full"
              />
            </div>
            <h1 className="w-full text-center text-gray-800  pt-3 text-3xl">Dark Thunder</h1>
          </div>
        </div>
        <div className="w-1/2 flex bg-black justify-center items-center">
          <form action="" onSubmit={submitEventHandler}>
            <div className="px-5 bg-white shadow-lg rounded-xl flex-col shadow-gray-600 flex gap-2">
              <h1 className="text-2xl w-full text-center py-4">Login</h1>
              <p>Email</p>
              <input
                type="text"
                className="rounded-md p-3 py-2 w-full border"
                onChange={emailChangeEventHandler}
                style={{ border: email.ok ? "" : "1px solid red" }}
              />
              <p>Password</p>
              <input
                type="password"
                className="rounded-md p-3 py-2 w-full border"
                onChange={passwordChangeEventHandler}
                style={{ border: password.ok ? "" : "1px solid red" }}
              />
              <div className="p-3">
                <Button>Submit</Button>
              </div>
            </div>
            <p className="pt-3 text-white">Don't have an account yet ? <a className="text-blue-500" href="/user/register">Register</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

function inputIsValid(arg: string, expression: RegExp): Boolean {
  return arg.match(expression) ? false : true;
}
