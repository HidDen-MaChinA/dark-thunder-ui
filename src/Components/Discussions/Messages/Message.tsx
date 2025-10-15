type MessageProps = {
    own?: boolean
    message?: string
    userName?: string
    pfp?: string
    date?: Date
}

export default function Message(props: MessageProps){
    const {own, message, pfp, userName, date} = props
        let strBuilder = "";
    if(date){
        strBuilder = own ? "Sent at ": "Received at"
        strBuilder += formatNumberToString(date.getHours()) + ":";
        strBuilder += formatNumberToString(date.getMinutes()) + "min"
    }
    return (
      <div
        style={{ justifyContent: own ? "end" : "start" }}
        className="px-3 py-1 w-full bg-white relative z-10 flex"
      >
        <div className="flex flex-col relative">
          <div className="flex gap-1" style={{ flexDirection: own ? "row-reverse" : "row" }}>
            {pfp && !own && (
              <div className="h-[40px] mt-3 w-[40px] bg-gray-800 rounded-full">
                <img src={pfp} alt="" className="rounded-full" />
              </div>
            )}
            <div
              className="flex flex-col group"
              style={{ alignItems: own ? "end" : "start" }}
            >
              <div className="text-gray-900 text-sm px-1">{userName}</div>
              <div className="px-3 py-2 bg-gray-300 rounded-xl max-w-[400px]">
                {message}
              </div>
              {date && (
                <div className="text-gray-600 invisible z-10 mt-[-20px] duration-[100ms] group-hover:visible px-2 group-hover:mt-[0] group-hover:text-gray-600 text-sm">
                  {strBuilder}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

function formatNumberToString(arg: number) : string{
    return (arg < 9 ? "0":"") + arg;
}