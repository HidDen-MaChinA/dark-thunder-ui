import Button from "../Login/Button";

export default function InputBar(){
    return (
        <div className="px-2 py-3 w-full border-t border-gray-400 jutify-between flex gap-2 items-center">
            <div className="flex-1">
                <input type="text" placeholder="type your message..." className="rounded-xl px-2 py-2 border w-full" />
            </div>
            <div>
                <Button width="max-content">Send something</Button>
            </div>
        </div>
    )
}