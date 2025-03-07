import React from "react"

type TextFieldProps = {
    label?: string
    type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function TextField(props: TextFieldProps){
    const {label, type} = props
    return (
        <div className="w-full">
            {
                label && <p className="py-1">{label}</p>
            }
            <input {...props} type={type || "text"} className="w-full p-2 bg-white text-black border rounded-xl" />
        </div>
    )
}