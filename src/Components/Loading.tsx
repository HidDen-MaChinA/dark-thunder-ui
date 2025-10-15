import React from "react"
import "./Loading.css";


type LoadingPropsType = {
    children: React.ReactNode
    loading: boolean
    fallback?: React.ReactNode
}

export default function Loading(props: LoadingPropsType){
    const {children, loading, fallback} = props;
    return (
        loading ? 
        <>
            { fallback || 
                <div className="h-full w-full flex justify-center items-center">
                    <div className="spin-animated w-[80px] overflow-hidden relative h-[80px] flex justify-center items-center rounded-full">
                        <div className="absolute flex w-full h-full">
                            <div className="bg-white flex-1"></div>
                            <div className="bg-gray-800 flex-1"></div>
                        </div>
                        <div className="w-[70px] h-[70px] z-30 rounded-full bg-white">
                        </div>
                    </div>
                </div>
            }
        </>
        :   
        children

    )
}