'use client';
import Image from "next/image";
import Share from "../Share/Share";

export default function Footer() {
    return (
        <footer className="w-full px-4 md:px-10 py-6 md:py-8 bg-black text-white">
            <div className="flex justify-center md:justify-start py-4">
                <Image src="/enc.svg" width={150} height={150} alt="Encifher Logo" className="w-32 md:w-40 h-auto" />
            </div>

            <div className="text-center md:text-left text-white/70 text-[14px] md:text-[16px] py-6 leading-relaxed normal-case">
                <p>
                    Encifher is creating a Compliant Privacy 2.0 engine for DeFi. This engine allows dApps across existing 
                    L1, L2, and L3 networks to incorporate compliant privacy features seamlessly without fragmenting liquidity.
                    Please note that some services may be supported by trusted third-party providers. By using our platform, 
                    you agree to comply with applicable local laws and our&nbsp; 
                    <span className="text-white underline decoration-[#5024FF]">[Terms of Service]</span> and&nbsp; 
                    <span className="text-white underline decoration-[#5024FF]">[Privacy Policy]</span>.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between my-6 w-full">
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
                    <Share image="/telegram.svg" platform="telegram" />
                    <Share image="/twitter.svg" platform="twitter" />
                    <Share image="/discord.svg" platform="twitter" />
                    <Share image="/github.svg" platform="twitter" />
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-white/70 text-[14px] md:text-[16px]">BACKED BY</span>
                    <div className="bg-white opacity-10 w-[2px] h-[20px]"></div>
                    <Image src="/longhash.svg" width={140} height={30} alt="LongHash" className="w-auto h-6 md:h-8" />
                </div>
            </div>

            <div className="text-center mt-6">
                <p className="text-[14px] md:text-[16px] text-white/70">
                    © 2025 RIZE LABS, HQ SINGAPORE. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
