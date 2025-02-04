import Image from "next/image"
import Citrea from "@/public/citrea.svg"
import PopperLeft from "@/public/popper1.svg"
import PopperRight from "@/public/popper2.svg"
import CitreaLink from "@/public/citrealink.svg"

export default function CitreaHeader(){
    return(
        <div className="flex flex-row w-full justify-center items-center bg-[#5024FF] text-white px-4 py-2 normal-case" >
            <span className="flex flex-row">
                <Image src={PopperLeft} width={18} height={18} className="mx-2" alt=""/>
                We are Live on <Image src={Citrea} width={18} height={18} className="mx-2" alt=""/> Citrea
                <Image src={CitreaLink} width={18} height={18} className="mx-2" alt=""/>
                <Image src={PopperRight} width={18} height={18} className="mx-2" alt=""/>
            </span>
        </div>
    )
}