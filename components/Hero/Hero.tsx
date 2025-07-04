'use client'
import Image from 'next/image'
import MatrixLetters from "@/decorations/MatrixLetters"
import Navbar from "../Navbar/Navbar"
// import Button from '../Button/Button'
import UnderlinedText from '../Underlined/Underlined'
import { useState } from 'react'

export default function Hero() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("Join Waitlist")

    const handleSubmit = async () => {
        if (!email || status === "Joined") return
        try {
            setStatus("Joining...")
            const response = await fetch('/api/submit-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            if (!response.ok) throw new Error(await response.text())
            setStatus("Joined")
        } catch (error) {
            setStatus("Join Waitlist")
        }
    }

    return (
        <>
            <div className="relative min-h-screen w-full flex flex-col mt-10 items-center gap-8">
               
                <MatrixLetters />
                <Navbar />
                <div className="flex flex-col items-center w-full gap-8 md:gap-6 pb-5 md:pb-12 z-20">
                    <div className=" text-sm md:text-[20px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
                        <span className='px-4 text-[14px] py-2 bg-white/10 rounded-full mr-4'>
                            Join our community today
                        </span>
                        <button className='bg-white/10 rounded-full p-3'>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.70615 11.0209L0.835938 10.1507L9.03635 1.94238H1.58115V0.692383H11.1645V10.2757H9.91448V2.82051L1.70615 11.0209Z" fill="white" fill-opacity="0.8" />
                            </svg>
                        </button>
                    </div>
                    <h1 className="text-3xl md:text-[40px] font-[400] gradient-text text-center leading-tight px-3">Bringing <UnderlinedText>Privacy</UnderlinedText> To Solana Defi</h1>
                    <div>

                    </div>
                    <h1 className="text-sm md:text-[16px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
                        unlocking best price execution without exposing your wallet.
                        <br />fast. secure. private
                    </h1>
                    <div className="flex flex-col md:flex-row items-center mt-[1rem] items-stretch">
                        <input className='bg-white/10 bg-white/10 px-2 py-2 w-[310px] border border-white/25 '
                            placeholder='xyz@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                        />
                        <button className='bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-10 py-2 text-[14px]'
                            onClick={handleSubmit}
                        >
                            {status}
                        </button>
                    </div>
                </div>
                
                <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full flex justify-center items-end pointer-events-none'>
                    <Image src="/bg.png" alt="hero-image" className='w-[2000px] h-auto' width={2000} height={1000} />
                </div>
            </div>
        </>
    )
}
