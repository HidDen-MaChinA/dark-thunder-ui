type MessageProps = {
    own?: boolean
    message?: string
    userName?: string
    pfp?: string
    date: Date
}

export default function Message(props: MessageProps){
    const {own, message, pfp, userName, date} = props
    let strBuilder = own ? "Sent at ": "Received at"
    strBuilder += formatNumberToString(date.getHours()) + "h and ";
    strBuilder += formatNumberToString(date.getMinutes()) + "min"
    return(
        <div style={{justifyContent: own ? "end" : "start" }} className="p-3 w-full flex">
            <div className="flex gap-2" style={{flexDirection: own ? "row-reverse" : "row"}}>
                {
                pfp && 
                    <div className="h-[35px] w-[35px] bg-black rounded-full">
                        <img src={pfp} alt="" className="w-full h-full rounded-full" />
                    </div>
                }
                <div className="flex flex-col" style={{alignItems: own ? "end" : "start" }} >
                    <div className="p-3 bg-gray-300 rounded-xl max-w-[400px]">{message}</div>
                    <div className="text-gray-600 px-2 text-sm">{strBuilder}</div>
                </div>
            </div>
        </div>
    )
}

function formatNumberToString(arg: number) : string{
    return (arg < 9 ? "0":"") + arg;
}