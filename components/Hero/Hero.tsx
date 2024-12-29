'use client'
import Image from 'next/image'
import MatrixLetters from "@/decorations/MatrixLetters"
import Navbar from "../Navbar/Navbar"
import Button from '../Button/Button'

export default function Hero() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-between items-center px-[11%] py-[2%]">
            <MatrixLetters />
            <Navbar />
            <div className="flex flex-col items-center w-full gap-[1rem] pb-[2rem]">
                <h1 className="text-[64px] font-[400] gradient-text">Bringing Privacy To Users</h1>
                <h1 className="text-[20px] font-[300] text-white text-opacity-60 w-[50%] text-center">
                    Unlocking the full potential of DeFi for institutional players. Lets not force Web 3 users to fragment their liquidity because of privacy.
                </h1>
                <div className="flex items-center gap-[2rem] mt-[2rem]">
                    <Button text="Join community" onClick={() => console.log("Join Community")} />
                    <p className="gradient-text text-[20px] font-[300]">Explore Privacy</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 w-[20%]">
                <p className="gradient-text text-[20px] font-[300]">Start your journey</p>
                <Image width={10} height={10} src="/arrow-down.svg" alt="" className="w-[24px] h-[24px]" />
            </div>
        </div>
    )
}