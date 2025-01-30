'use client';
import Image from "next/image"
import Share from "../Share/Share";

export default function Footer() {
    return (
        <>
            <div className="flex flex-col w-full px-4 md:px-10 py-4 md:py-7">
                <div className="flex flex-row justify-start py-4" >
                    <Image src="/enc.svg" width={150} height={150} alt="Rize Logo" />
                </div>
                <div className="flex flex-col text-white/70 text-[16px] normal-case py-8" >
                    <span>Encifher is a decentralized technology platform focused on providing secure and privacy-enhancing Web3 solutions. Please note that some services may be supported by trusted third-party providers. By using our platform, you agree to comply with applicable local laws and our <span className="text-white underline decoration-[#5024FF]">[Terms of Service]</span> and <span className="text-white underline decoration-[#5024FF]">[Privacy Policy]</span>.</span>
                </div>
                <div className="flex flex-row w-full my-4" >
                    <div className="flex flex-row w-[50%] justify-start items-center">
                        <Share image="/telegram.svg" platform="telegram" />
                        <Share image="/twitter.svg" platform="twitter" />
                        <Share image="/discord.svg" platform="twitter" />
                        <Share image="/github.svg" platform="twitter" />
                    </div>
                    <div className="flex flex-row w-[50%] justify-end items-center" >
                        <span className="text-white/70 text-[16px] ">BACKED BY</span>
                        <div className="bg-white opacity-10 w-[2px] h-[20px] mx-4"></div>
                        <Image src="/longhash.svg" width={140} height={30} alt="Rize Logo" />
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center my-4" >
                    <p className="text-[16px] my-4 text-white/70 normal-case">© 2025 RIZE LABS, HQ SINGAPORE. All Rights Reserved.</p>
                </div>
            </div>
        </>
    )
}