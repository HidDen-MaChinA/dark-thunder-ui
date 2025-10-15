import React, { useState } from "react";
import Topbar from "../Components/Discussions/Topbar";
import Button from "../Components/Login/Button";
import TextField from "../Components/TextField";
import { DiscussionProvider } from "../Providers/DiscussionProvider";
import { useNavigate } from "react-router-dom";

export default function CreateDiscussion(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [messageRestrictionRegex, setMessageRestrictionRegex] = useState("");
    const [image, setImage] = useState<File | null>();
    
    const submitEventHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        DiscussionProvider.create({
            name: name,
            message_restriction_regex: messageRestrictionRegex,
            image:image
        }).then((res)=>{
            console.log(res);
            navigate("/discussions");
        })
    }
    
    const imageSelectionEventHandler = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const files = event.target.files
        if(files !== null){
            setImage(files.item(0));
        }
    }

    return(
        <div className="w-[100vw] h-[100vh] flex flex-col">
            <Topbar>
                <div className="h-full flex items-center">
                    <h1 className="text-2xl text-gray-800 text-center">
                        Create new discussion
                    </h1>
                </div>
            </Topbar>
            <div className="w-full h-full flex justify-center items-center">
                <form action="" onSubmit={submitEventHandler}>
                    <div className="w-max p-3 shadow-lg border rounded-lg">
                        <div className="w-full justify-center flex">
                            <div className="w-[100px] relative h-[100px]">
                                <div className="w-[100px] flex justify-center items-center overflow-hidden h-[100px] relative rounded-full bg-white border border-gray-300">
                                    {
                                        image ? 
                                        <img className="w-full" src={URL.createObjectURL(image)} alt="" />:
                                        <img src="/images/icons/galerie.svg" height={70} width={70} alt="" />
                                    }
                                </div>
                                <label htmlFor="input-image" className="absolute bottom-1 right-1 rounded-full w-[25px] h-[25px] flex justify-center items-center bg-gray-500">
                                    <img height={15} width={15} src="/images/icons/crayon.svg" alt="" />
                                    <input id="input-image" type="file" hidden onChange={imageSelectionEventHandler} />
                                </label>
                            </div>
                        </div>
                        <TextField onChange={(e)=>{setName(e.target.value)}} label="Name" placeholder="Discussion name"/>
                        <TextField onChange={(e)=>{setMessageRestrictionRegex(e.target.value)}} label="Discussion message limitation (regex)" placeholder="/work like magique/g"/>
                        <div className="py-3">  
                            <Button>Create</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}