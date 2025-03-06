type DateNotifierProps = {
    date: Date
}

export function DateNotifier(props: DateNotifierProps){
    const {date} = props
    let strBuilder = ""
    strBuilder += date.getFullYear() + "/";
    strBuilder += formatNumberToString(date.getMonth()) + "/";
    strBuilder += formatNumberToString(date.getDay());
    strBuilder += " , at "
    strBuilder += formatNumberToString(date.getHours()) + "h and ";
    strBuilder += formatNumberToString(date.getMinutes()) + "min"
    return (
        <div className="flex text-black gap-2 justify-center items-center">
            <hr className="flex-1 rounded-md border-gray-400"/>
            <div className="bg-gray-200 rounded-lg px-2">{ strBuilder }</div>
            <hr className="flex-1 rounded-md border-gray-400"/>
        </div>
    )
}

function formatNumberToString(arg: number) : string{
    return (arg < 9 ? "0":"") + arg;
}
