import Sidebar from "../Components/Messages/Sidebar";

export default function Messages(){
    return (
        <div className="w-[100vw] h-[100vh]">
            <Sidebar closedWidth={50} openedWidth={200} />
        </div>
    )
}