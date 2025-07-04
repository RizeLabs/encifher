'use client'
import Image from 'next/image'
// import MatrixLetters from "@/decorations/MatrixLetters"
import Navbar from "../Navbar/Navbar"
// import Button from '../Button/Button'
import UnderlinedText from '../Underlined/Underlined'
import { useState } from 'react'

export default function Hero() {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState("Join Waitlist")

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async () => {
        if (!email || status === "Joined") return
        if (!validateEmail(email)) {
            setStatus("Invalid Email")
            return
        }
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
            setStatus("Joined Waitlist")
        } catch (error) {
            setStatus("Join Waitlist")
            console.error(error)
        }
    }

    return (
        <>
            <div className="relative bg-[#0c0c0c] min-h-screen w-full flex flex-col  items-center gap-8 pb-[200px]">
                <div className="absolute top-0 -left-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/bgstrip3.svg" alt="strip1" width={49} height={341} />
                </div>
                <div className="absolute top-0 -left-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/bgstrip1.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/bgstrip2.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none">
                    <Image src="/bgstrip4.svg" alt="strip4" width={49} height={341} />
                </div>

                <Navbar />
                <div className="flex flex-col md:flex-col items-center w-full gap-8 md:gap-6 pb-5 md:pb-12 z-20">
                    <div className=" text-sm md:text-[20px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
                        <span className='px-4 text-[14px] py-2 bg-white/10 rounded-full mr-4'>
                            Join our community today
                        </span>
                        <a href="https://t.me/+QJjLUOh0ib9iYzI1" target="_blank" rel="noopener noreferrer">
                            <button className='bg-white/10 rounded-full p-3'>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.70615 11.0209L0.835938 10.1507L9.03635 1.94238H1.58115V0.692383H11.1645V10.2757H9.91448V2.82051L1.70615 11.0209Z" fill="white" fill-opacity="0.8" />
                                </svg>
                            </button>
                        </a>
                    </div>
                    <h1 className="text-3xl md:text-[40px] font-[400] gradient-text text-center leading-tight px-3">Bringing <UnderlinedText>Privacy</UnderlinedText> To Solana Defi</h1>
                    <div>

                    </div>
                    <h1 className="text-sm md:text-[16px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
                        unlocking best price execution without exposing your wallet.
                        <br />fast. secure. private
                    </h1>
                    <div className="flex flex-col md:flex-row items-center mt-[1rem] items-stretch w-full max-w-xs md:max-w-lg mx-auto">
                        <input className='bg-white/10 px-2 py-2 w-full md:w-[310px] border border-white/25 text-white'
                            placeholder='xyz@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
                        />
                        <button className='bg-primary-brand/15 border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-6 md:px-10 py-2 text-[14px] w-full md:w-auto mt-2 md:mt-0'
                            onClick={handleSubmit}
                        >
                            {status}
                        </button>
                    </div>
                </div>

                <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full flex justify-center items-end pointer-events-none'>
                    <Image src="/bg.svg" alt="hero-image" className='w-auto max-w-auto md:h-[90vh]' width={2000} height={1000} />
                </div>
                <div className='absolute left-1/2 bottom-10 transform -translate-x-1/2 w-full flex justify-center items-end pointer-events-none'>
                    <span className='text-white/60 text-xs font-lexend text-center flex flex-col items-center gap-2'>
                        Start your journey
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="mask0_1_3466" maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                                <rect x="0.399414" y="0.257782" width="17.2012" height="17.2012" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_1_3466)">
                                <path d="M8.46235 3.483V12.1746L4.37975 8.09203L3.62451 8.85837L8.99988 14.2337L14.3753 8.85837L13.62 8.09203L9.53742 12.1746V3.483H8.46235Z" fill="white" fill-opacity="0.8" />
                            </g>
                        </svg>

                    </span>
                </div>
            </div>
        </>
    )
}
