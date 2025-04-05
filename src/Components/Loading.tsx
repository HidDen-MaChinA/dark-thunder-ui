import React from "react"


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
            {fallback || <div>loading...</div>}
        </>
        :   
        children

    )
}