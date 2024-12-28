import Image from "next/image"
import Button from "../Button/Button"

export default function Navbar() {
    return (
        <div
            className="w-[100%] h-[3%] p-[8px] pl-[16px] flex justify-between items-center rounded-[16px] 
                       border-[1px] backdrop-blur-[25px] border-nav-grad"
        >
            <div className="flex items-center gap-2">
                <Image width={10} height={10} src="/enc.svg" alt="Hero" className="w-[22px] h-[22px]" />
                <div className="text-[23px] gradient-text font-[300]">ENCIFHER</div>
            </div>
            <div className="flex items-center gap-[20px]">
                <div className="gradient-text text-[20px]">Docs</div>
                <Button text="Launch App" onClick={() => console.log("Launch App")} />
            </div>
        </div>
    )
}