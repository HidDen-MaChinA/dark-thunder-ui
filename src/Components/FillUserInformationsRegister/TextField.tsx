import React from "react"

type TextFieldProps = {
    label?: string
} & React.HTMLAttributes<HTMLInputElement>

export default function TextField(props: TextFieldProps){
    const {label} = props
    return (
        <div className="w-full">
            {
                label && <p>{label}</p>
            }
            <input {...props} type="text" className="w-full" />
        </div>
    )
}