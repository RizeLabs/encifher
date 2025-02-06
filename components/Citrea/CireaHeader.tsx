import Image from "next/image"
import Citrea from "@/public/citrea.svg"
import CitreaLink from "@/public/citrealink.svg"

const citreaPaymentBotLink = 'https://t.me/EncifherPayCitreaBot';

export default function CitreaHeader(){
    return(
        <div className="flex flex-row w-full h-[36px] justify-center text-[14px] items-center bg-[#5024FF] text-white normal-case" >
            <span className="flex flex-row">
                Payments bot live on 
                <span className="flex flex-row hover:cursor-pointer" onClick={() => window.open(citreaPaymentBotLink, "_blank")}>
                <Image src={Citrea} width={18} height={18} className="mx-2" alt=""  /> 
                    Citrea
                <Image src={CitreaLink} width={18} height={18} className="mx-2" alt=""/>
                </span>
            </span>
        </div>
    )
}