'use client';
import Image from "next/image"
import Share from "../Share/Share";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col w-full justify-center items-center">  
                <div className="w-full h-[5%] flex flex-row justify-center items-center text-white/70 px-4 md:px-10 py-4 md:py-7">
                    <div className="flex flex-col w-[50%] gap-4">
                        <span className="text-[16px]">BACKED BY</span>
                        <Image src="/longhash.svg" width={200} height={30} alt="Rize Logo" />
                        <p className="text-[16px]">© 2025 RIZE LABS, HQ SINGAPORE</p>
                    </div>
                    <div className="flex flex-row w-[50%] justify-end">
                        <Share image="/telegram.svg" platform="telegram" />
                        <Share image="/twitter.svg" platform="twitter"/>
                        <Share image="/discord.svg" platform="twitter"/>
                        <Share image="/github.svg" platform="twitter"/>
                    </div>
                </div>
                <div className="w-[95%] h-[2px] bg-white opacity-10 "></div>
                <div className="flex flex-col text-white/70 text-[16px] normal-case text-center px-4 md:px-10 py-4 md:py-14" >
                    <span>Encifher is a decentralized technology platform focused on providing secure and privacy-enhancing Web3 solutions.</span>
                    <span> Please note that some services may be supported by trusted third-party providers.</span>
                    <span>By using our platform, you agree to comply with applicable local laws and our <span className="text-white underline decoration-[#5024FF]">[Terms of Service]</span> and <span className="text-white underline decoration-[#5024FF]">[Privacy Policy]</span>.</span>
                </div>
            </div>
        </>
    )
}