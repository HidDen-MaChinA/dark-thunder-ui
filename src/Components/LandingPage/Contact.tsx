export default function Contact (){
    const links : ContactInfoProps[] = [
        {image: "", text: "Github"},
        {image: "", text: "Gmail"},
        {image: "", text: "LinkedIn"}
    ] 
    return (
        <div className="h-[400px] p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-3 w-full items-center">
                <p className="text-3xl w-4/5 text-center">User Interface is Important when it come to sell a product, it is therefor important to make it clean, efficient and understandable.</p>
            </div>
            <div className="flex justify-center flex-col items-center">
                <p className="text-3xl text-center">Find me on</p>
                <div className="flex flex-row justify-between w-4/5">
                    {
                        links.map((item, i)=>(<ContactInfo key={"Contact-info-id-" + i} {...item}/>))
                    }
                </div>
            </div>
        </div>
    )
}

function ContactInfo(props: ContactInfoProps){
    const {image, text} = props;
    return(
        <div className="flex items-center gap-3">
            <div className="h-[40px] w-[40px]">
                <img src={`/images/icons/${image}`} alt="" />
            </div>
            <p>{text}</p>
        </div>
    )
}

type ContactInfoProps = {
    image: string
    text: string
}