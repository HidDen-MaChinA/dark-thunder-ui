import { useEffect, useState } from "react"

export default function Navbar(){
    const [scrolledUp, setScrolledUp]= useState(false);
    useEffect(()=>{
        let current = 0;
        window.addEventListener("scroll", ()=>{
            if(window.scrollY < current){
                setScrolledUp(true);
                current = window.scrollY
            }else{
                setScrolledUp(false)
                current = window.scrollY
            }
        })
    }, [])
    return (
      <div className="sticky flex justify-between items-center top-0 text-black backdrop-blur bg-[#ffffffd0] p-2" style={{top: scrolledUp ? 0 : -100 ,zIndex: 88 , transitionDuration: "400ms"}}>
        <div className="py-3 px-6 flex flex-row gap-3">
          <a href="#presentation" className="">About me</a>
          <a href="#language-list" className="">Tecnos</a>
          <a href="#contact" className="">Contacts</a>
        </div>
        <div>
          <a href="/user/login" className="bg-gray-800 text-white p-2 rounded-lg shadow-md">Try DarkThunder</a>
        </div>
      </div>
    );
}