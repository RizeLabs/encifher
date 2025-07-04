"use client"

import Image from "next/image";

export default function Testimonial() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center gap-[2rem] my-[7rem] w-full">
            <span className="text-white text-4xl">Users love Encifher</span>
            <span className="text-white/80 text-[16px] text-center">
                Trusted by privacy-first users who value <br/> secure, seamless payments.
            </span>
            <div className="relative w-full flex justify-center items-center">
                <Image src="/tweets.svg" alt="testimonial" width={1000} height={1000} className="w-[90%]" />
                {/* Left Gradient */}
                <div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to right, #0c0c0c 13%, transparent 100%)'}} />
                {/* Right Gradient */}
                <div className="absolute right-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to left, #0c0c0c 13%, transparent 100%)'}} />
            </div>
        </div>
    )
}