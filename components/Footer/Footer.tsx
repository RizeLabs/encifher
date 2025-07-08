'use client';
import Image from "next/image";
import Link from "next/link";
// import Community from "../Community/Community";

export default function Footer() {
    return (
        <footer className="w-full px-4 sm:px-6 md:px-10 py-8 bg-[#0c0c0c] text-white font-mono">
            <div className="flex flex-col md:flex-row w-full max-w-full">
                {/* Left 60%: Logo, Description, Backed by */}
                <div className="w-full md:w-[60%] flex flex-col justify-between mb-12 md:mb-0">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Image src="/enc.svg" width={32} height={32} alt="Encifher Logo" className="w-[100px] sm:w-[139px] h-[24px]" />
                        </div>
                        <p className="text-white/70 text-sm md:text-[14px] font-mono uppercase mb-2 w-full md:w-[60%] uppercase">
                        Encifher is bringing compliant privacy to users
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-white/70 text-sm md:text-[14px] font-mono">BACKED BY</span>
                        <div className="w-[1px] h-[25px] bg-white/40"/>
                        <Image src="/longhash.svg" width={70} height={20} alt="LongHash" className="w-[60px] sm:w-[97px] h-[30px] sm:h-[40px]" />
                    </div>
                </div>
                {/* Right 40%: Socials, Resources, Company */}
                <div className="w-full md:w-[40%] ml-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Socials */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm md:text-[14px] text-white/50 mb-2">SOCIALS</span>
                            <Link href="https://x.com/encifherio" className=" text-base md:text-[16px] mb-1">X/TWITTER</Link>
                            <Link href="https://discord.gg/" className=" text-base md:text-[16px] mb-1">DISCORD</Link>
                            <Link href="https://t.me/+ZWHGMW4ZHXQwYTZl" className=" text-base md:text-[16px]">TELEGRAM</Link>
                        </div>
                        {/* Resources */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm md:text-[14px] text-white/50 mb-2">RESOURCES</span>
                            <Link href="/blogs" className=" text-base md:text-[16px] mb-1">BLOG</Link>
                            <Link href="https://docs.encifher.io/" target="_blank" className=" text-base md:text-[16px] mb-1">DOCS</Link>
                            <Link href="#" className=" text-base md:text-[16px]">BRAND KIT</Link>
                        </div>
                        {/* Company */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm md:text-[14px] text-white/50 mb-2">COMPANY</span>
                            <Link href="#" className=" text-base md:text-[16px] mb-1">TERMS OF SERVICE</Link>
                            <Link href="#" className=" text-base md:text-[16px] mb-1">PRIVACY POLICY</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative text-center mt-10 pb-10 overflow-hidden h-[120px] sm:h-[160px] md:h-[200px]">
                <Image 
                    src="/footer.svg" 
                    width={800} 
                    height={200} 
                    alt="Footer Decoration" 
                    className="absolute left-0 bottom-0 w-full h-full object-cover z-0 pointer-events-none select-none"
                    aria-hidden="true"
                />
                <p className="absolute left-0 right-0 bottom-4 text-xs md:text-[14px] text-white/70 font-mono tracking-wide z-10">
                    © 2025 RIZE LABS, HQ SINGAPORE. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
