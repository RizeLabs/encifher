"use client"

import Image from "next/image";

export default function Testimonial() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] items-center justify-center  my-16 md:my-[7rem] w-full px-4 sm:px-6 md:px-0">
            <span className="text-white text-2xl sm:text-3xl md:text-4xl text-center">Users love Encifher</span>
            <span className="text-white/80 text-base md:text-[16px] text-center mt-[34px] mb-[100px]">
                Chosen by traders who wont compromise on performance or privacy
            </span>
            <div className="relative w-full flex justify-center items-center">
                <Image src="/tweets1.png" alt="testimonial" width={1000} height={1000} className="w-full md:w-[90%] h-auto hidden md:flex" />
                <div className="flex flex-col md:hidden" >
                <Image src="/mdtweet1.svg" alt="testimonial" width={1000} height={1000} className="w-full md:w-[90%] h-auto " />
                <Image src="/mdtweet2.svg" alt="testimonial" width={1000} height={1000} className="w-full md:w-[90%] h-auto " />
                </div>
                {/* Left Gradient */}
                <div className="absolute left-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to right, #0c0c0c 13%, transparent 100%)'}} />
                {/* Right Gradient */}
                <div className="absolute right-0 top-0 h-full w-1/4 pointer-events-none z-10" style={{background: 'linear-gradient(to left, #0c0c0c 13%, transparent 100%)'}} />
            </div>
        </div>
    )
}