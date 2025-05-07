import React, { DetailsHTMLAttributes, InputHTMLAttributes } from "react";
import Button from "../Login/Button";

type InputBarPropsType = {
    onButtonClicked: React.MouseEventHandler<HTMLButtonElement>
} & InputHTMLAttributes<HTMLInputElement>

export default function InputBar(props:InputBarPropsType){
    return (
        <div className="px-2 py-3 w-full border-t border-gray-400 jutify-between flex gap-2 items-center">
            <div className="flex-1">
                <input {...{...props,onButtonClicked:undefined}} type="text" placeholder="type your message..." className="rounded-xl px-2 py-2 border w-full" />
            </div>
            <div>
                <Button onClick={props.onButtonClicked} width="max-content">Send something</Button>
            </div>
        </div>
    )
}