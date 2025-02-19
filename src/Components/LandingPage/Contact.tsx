export default function Contact (){
    const network : ContactInfoProps[] = [
        {image: "github.svg", text: "Hidden-machina", link: "https://github.com/hidden-machina"},
        {image: "linkedin.svg", text: "Niaina Franco ROBERTO"},
        {image: "test.png", text: "Franco Roberto"}
    ] 
    
    const contact : ContactInfoProps[] = [
        {image: "gmail.svg", text: "hei.franco.3@gmail.com"},
        {image: "contact-phone.svg", text: "0382151528"},
    ]

    return (
        <div className="h-[60vh] p-6 flex flex-col justify-between">
            <div className="flex flex-col gap-3 w-full items-center">
                <p className="text-3xl w-4/5 text-center">User Interface is Important when it come to sell a product, it is therefor important to make it clean, efficient and understandable.</p>
            </div>
            <div className="flex justify-center gap-[200px] flex-row items-center">
                <div className="flex justify-center flex-col items-center w-1/2 gap-6 w-content">
                    <p className="text-3xl text-center">Find me on</p>
                    <div className="flex flex-row justify-center gap-7 w-full flex-wrap">
                        {
                            network.map((item, i)=>(<ContactInfo key={"Contact-info-id-" + i} {...item}/>))
                        }
                    </div>
                </div>
                <div className="flex justify-center flex-col items-center w-1/2 gap-6">
                    <p className="text-3xl text-center">Contact</p>
                    <div className="flex flex-row justify-center gap-7 w-full flex-wrap">
                        {
                            contact.map((item, i)=>(<ContactInfo key={"Contact-info-id-" + i} {...item}/>))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function ContactInfo(props: ContactInfoProps){
    const {image, text, link} = props;
    return(
        <a className="flex items-center gap-2 p-1 bg-[#ededed] pr-3 rounded-lg" href={link && link}>
            <div className="h-[40px] w-[40px]">
                <img src={`/images/icons/${image}`} alt="" />
            </div>
            <p>{text}</p>
        </a>
    )
}

type ContactInfoProps = {
    image: string
    text: string
    link?: string
}