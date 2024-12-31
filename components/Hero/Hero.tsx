'use client'
import Image from 'next/image'
import MatrixLetters from "@/decorations/MatrixLetters"
import Navbar from "../Navbar/Navbar"
import Button from '../Button/Button'
import UnderlinedText from '../Underlined/Underlined'

export default function Hero() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-between items-center gap-8">
            <MatrixLetters />
            <Navbar />
            <div className="flex flex-col items-center w-full gap-8 md:gap-12 pb-5 md:pb-12">
                <h1 className="text-3xl md:text-[64px] font-[400] gradient-text text-center leading-tight px-3">Bringing <UnderlinedText>Privacy</UnderlinedText> To Users</h1>
                <h1 className="text-sm md:text-[20px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
                    Unlocking the full potential of DeFi for institutional players. Lets not force Web 3 users to fragment their liquidity because of privacy.
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 mt-[1rem] items-stretch">
                    <Button text="Join community" onClick={() => window.open("https://t.me/BananaHQ/", "_blank")} />
                    <Button
                        text="Explore privacy"
                        onClick={() => window.open("https://docs.encifher.io/docs/intro/", "_blank")}
                        className='text-white/60 bg-white/5 border-white/5 hover:bg-white/10'
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 w-full mb-2 md:w-[20%]">
                <p className="gradient-text text-md md:text-[20px] font-[300] text-center">Start your journey</p>
                <Image width={10} height={10} src="/arrow-down.svg" alt="" className="w-[24px] h-[24px]" />
            </div>
        </div>
    )
}
