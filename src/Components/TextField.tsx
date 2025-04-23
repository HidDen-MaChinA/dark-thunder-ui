import React from "react"

type TextFieldProps = {
    label?: string
    type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function TextField(props: TextFieldProps){
    const {label, type} = props
    return (
        <div className="w-full relative">
            {
                label && <p className="py-1">{label}</p>
            }
            <input {...props} type={type || "text"} className="w-full py-1 px-2 bg-white text-black border border-gray-400 rounded-lg" />
        </div>
    )
}