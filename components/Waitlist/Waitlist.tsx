"use client"
import Image from "next/image";
import { useState } from "react";

export default function Waitlist() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("Join Waitlist");

    const handleSubmit = async () => {
        if (!email || status === "Joined") return;
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
            setStatus("Joined");
        } catch (error) {
            setStatus("Join Waitlist");
        }
    }

    return (
        <div className="flex flex-col md:flex-row w-full px-[10%] gap-8 relative overflow-hidden">
            <div className="flex-1 flex items-center justify-center bg-zinc-900 rounded-lg overflow-hidden relative">
                <div className="absolute top-0 -left-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/strip1.svg" alt="strip1" width={49} height={341} />
                </div>
                <div className="absolute top-0 -left-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/strip2.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/strip3.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/strip4.svg" alt="strip4" width={49} height={341} />
                </div>
                <div className="relative z-10 flex flex-col p-8">
                    <span className="text-white text-[40px] font-[300] mt-[50px]">
                        Privacy without compromise
                    </span>
                    <span className="text-white/60 text-[16px] font-[300] mt-[10px]">
                        Join the waitlist to get early access to Encifher.
                    </span>
                    <div className="mb-[50px] mt-[35px]">
                        <input type="text" placeholder="xyz@gmail.com" className="bg-white/10 bg-white/10 px-2 py-2 w-[310px] border border-white/25 " value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }} />
                        <button className="bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-10 py-2 text-[14px]" onClick={handleSubmit}>
                            {status}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}