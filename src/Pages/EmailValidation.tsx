import { useState } from "react";
import Button from "../Components/Login/Button";

export default function EmailValidation(){
    const [verificationCode, setVerificationCode] = useState("");
    const verificationCodeInputOnChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const allLettersPattern = /[a-zA-Z]/g
        if(e.target.value.match(allLettersPattern) == null){
            setVerificationCode(e.target.value)
        }
    }
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="p-3 flex flex-col gap-3 rounded-xl border shadow-xl w-[400px]">
                <h1 className="text-lg">Email verification</h1>
                <p>We sent a code to <span className="text-blue-500">hei.franco.3@gmail.com</span></p>
                <input type="text" value={verificationCode} onChange={verificationCodeInputOnChangeEventHandler} placeholder="XXXXXX" maxLength={6} className="text-center border rounded-lg w-full text-black p-1" />
                <div className="flex">
                    <Button>Confirm</Button>
                </div>
            </div>
            <div className="absolute right-5 bottom-5">Already have an Account ? go back to <a href="/login" className="text-blue-500">Login</a></div>
        </div>
    )
}
