"use client"

import Image from "next/image";

export default function Testimonial() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center  my-16 md:mb-[2rem] w-full px-4 sm:px-6 md:px-0">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl text-center">Users love Encifher</span>
            <span className="text-white/80 text-base md:text-[16px] text-center mt-[20px] mb-[64px]">
                Chosen by traders who wont compromise on performance or privacy
            </span>
            <div className="relative w-full flex justify-center items-center overflow-hidden">
                {/* Auto-scrolling row for md+ screens */}
                <div className="hidden md:flex w-full">
                    <div className="flex items-center gap-2 animate-scroll-row">
                        <Image src="/tweets/Rectangle 2970.png" alt="tweet1" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2960.png" alt="tweet2" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2967.png" alt="tweet3" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2971.png" alt="tweet4" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2966.png" alt="tweet5" width={586} height={708} />
                        <Image src="/tweets/Rectangle 2961.png" alt="tweet6" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2963.png" alt="tweet7" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2964.png" alt="tweet8" width={583} height={708} />
                        {/* Duplicate for seamless loop */}
                        <Image src="/tweets/Rectangle 2970.png" alt="tweet1-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2960.png" alt="tweet2-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2967.png" alt="tweet3-dup" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2971.png" alt="tweet4-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2966.png" alt="tweet5-dup" width={586} height={708} />
                        <Image src="/tweets/Rectangle 2961.png" alt="tweet6-dup" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2963.png" alt="tweet7-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2964.png" alt="tweet8-dup" width={583} height={708} />
                    </div>
                </div>
                {/* Mobile view: auto-scrolling PNGs */}
                <div className="flex md:hidden w-full">
                    <div className="flex items-center gap-2 animate-scroll-row">
                        <Image src="/tweets/Rectangle 2970.png" alt="tweet1" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2960.png" alt="tweet2" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2967.png" alt="tweet3" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2971.png" alt="tweet4" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2966.png" alt="tweet5" width={586} height={708} />
                        <Image src="/tweets/Rectangle 2961.png" alt="tweet6" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2963.png" alt="tweet7" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2964.png" alt="tweet8" width={583} height={708} />
                        {/* Duplicate for seamless loop */}
                        <Image src="/tweets/Rectangle 2970.png" alt="tweet1-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2960.png" alt="tweet2-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2967.png" alt="tweet3-dup" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2971.png" alt="tweet4-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2966.png" alt="tweet5-dup" width={586} height={708} />
                        <Image src="/tweets/Rectangle 2961.png" alt="tweet6-dup" width={584} height={708} />
                        <Image src="/tweets/Rectangle 2963.png" alt="tweet7-dup" width={583} height={708} />
                        <Image src="/tweets/Rectangle 2964.png" alt="tweet8-dup" width={583} height={708} />
                    </div>
                </div>
                {/* Left Gradient */}
                <div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to right, #0c0c0c 13%, transparent 100%)'}} />
                {/* Right Gradient */}
                <div className="absolute right-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to left, #0c0c0c 13%, transparent 100%)'}} />
            </div>
        </div>
    )
}