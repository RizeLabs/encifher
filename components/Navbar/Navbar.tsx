'use client'
import Image from "next/image"
import Button from "../Button/Button"

export default function Navbar() {
    return (
        <div
            className="w-[100%] h-[3%] flex justify-between items-center px-10 py-7"
        >
            <div className="flex items-center gap-2">
                <Image width={120} height={30} src="/enc.svg" alt="logo" />
            </div>
            <div className="flex items-center gap-2">
                <Button text="Docs" onClick={() => console.log("Docs")} className="px-4 py-2 text-sm text-white/60 bg-white/5 border-white/5 hover:bg-white/10" />
                <Button text="Launch App" onClick={() => console.log("Launch App")} className="px-4 py-2 text-sm" />
            </div>
        </div>
    )
}