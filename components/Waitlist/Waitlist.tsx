"use client"
import Image from "next/image";
import { useState } from "react";
import UnderlinedText from "../Underlined/Underlined";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("Join Waitlist");

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {
        if (!email || status === "Joined") return;
        if (!validateEmail(email)) {
            setStatus("Invalid Email");
            return;
        }
        try {
            setStatus("Joining...");
            const response = await fetch('/api/submit-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) throw new Error(await response.text());
            setStatus("Joined Waitlist");
        } catch (error) {
            setStatus("Join Waitlist");
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full px-4 sm:px-8 md:px-[10%] py-12 md:py-[133px] gap-8 relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center bg-zinc-900 rounded-lg overflow-hidden relative">
                <div className="absolute top-0 -left-[50%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/strip1.svg" alt="strip1" width={49} height={341} />
                </div>
                <div className="absolute top-0 -left-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/strip2.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[38%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/strip3.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[48%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/strip4.svg" alt="strip4" width={49} height={341} />
                </div>
                <div className="relative z-10 flex flex-col p-4 sm:p-8 items-center">
                    <span className="text-white text-[34px] sm:text-3xl md:text-[40px] font-[300] mt-8 md:mt-[50px] text-center">
                       <UnderlinedText>Privacy</UnderlinedText>  without compromise
                    </span>
                    <span className="text-white/60 text-[14px] md:text-[16px] font-[300] mt-2 md:mt-[34px]  text-center">
                    Join the movement for compliant privacy in DeFi
                    </span>
                    <div className="mb-8 md:mb-[50px] mt-8 md:mt-[35px] flex flex-col md:flex-row w-full max-w-xs md:max-w-lg">
                        <input type="text" placeholder="xyz@gmail.com" className="bg-white/5 px-4 py-2 w-full md:w-[310px] md:border-l md:border-y md:border-r-0 border md:rounded-l-[4px] md:rounded-r-[0px] rounded-[4px] border-white/10 text-[14px] text-white placeholder:text-white/40 backdrop-blur-lg" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} />
                        <button className="bg-primary-brand/15 md:rounded-r-[4px] md:rounded-l-[0px] rounded-[4px] border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-6 md:px-10 py-2 text-[14px] w-full md:w-auto mt-2 md:mt-0 backdrop-blur-lg" onClick={handleSubmit}>
                            {status}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}