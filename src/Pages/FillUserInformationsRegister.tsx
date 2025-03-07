import { useState } from "react";
import TextField from "../Components/FillUserInformationsRegister/TextField";
import Button from "../Components/Login/Button";

export default function FillUserInformationRegister(){
    const [PFP, setPFP] = useState<string>();
    const PFPInputEventHandler = (e: React.ChangeEvent<HTMLInputElement> ) =>{
        const files = e.target.files;
        if(files && files.item(0)){
            setPFP(URL.createObjectURL(files.item(0) as Blob))
        }
    }
    return (
        <div className="w-[100vw] h-[100vh] p-3 flex justify-center items-center">
            <div className="shadow-lg rounded-xl border">
                <h1 className="w-full text-center py-3 text-xl">Register finalisation</h1>
                <div className="flex gap-3">
                    <div className="flex px-6 pb-4 flex-col gap-2">
                      <TextField label="Firstname" placeholder="JOHN"/>  
                      <TextField label="Lastname" placeholder="Doe"/>  
                      <TextField type={"date"} label="Birthdate"/>
                      <TextField type={"password"} label="Password" placeholder="Your Password"/>
                      <TextField type={"password"} label="Password verification" placeholder="Your Password again"/>
                      <Button>Register</Button>
                    </div>
                    <div className="flex justify-center flex-col gap-4 items-center w-[300px]">
                        <div className="w-[200px] h-[200px] rounded-full bg-gray-200 border-4 border-gray-400 relative overflow-hidden">
                            <img src={PFP} alt="" className="min-w-[200px] min-h-[200px]  absolute translate-[-50% -50%]" />
                        </div>
                        <div>
                            <label className="border border-black block relative p-2 hover:bg-black hover:text-white transition-[500ms] rounded-lg" htmlFor="FillUserInformationPFP">
                                <input onChange={PFPInputEventHandler} id="FillUserInformationPFP" type="file" hidden />
                                <p>Modify PFP</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}