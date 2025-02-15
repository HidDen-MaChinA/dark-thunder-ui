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
      <div className="sticky top-0 bg-black p-2" style={{top: scrolledUp ? 0 : -100 , transitionDuration: "400ms"}}>
        <div className="py-3 px-6 flex flex-row gap-3">
          <a href="" className="text-white">Who am I ?</a>
          <a href="" className="text-white">Languages</a>
          <a href="" className="text-white">Project</a>
          <a href="" className="text-white">Contact</a>
        </div>
      </div>
    );
}