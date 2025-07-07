'use client'
import { useState } from "react"
import { faqs } from "./faqs"
import Image from "next/image"

interface QuestionProps {
    index: number
}

const Question = ({ index }: QuestionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleFAQ = () => {
        setIsOpen(!isOpen);
    };
    const parseText = (str: string) => {
        const regex = /{([^}]+)\}\{([^}]+)\}/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        while ((match = regex.exec(str)) !== null) {
            parts.push(str.slice(lastIndex, match.index));
            parts.push(
                <a key={match.index} href={match[2]} className="font-[500] text-[#987EFF]" target="_blank" rel="noopener noreferrer">
                    {match[1]}
                </a>
            );
            lastIndex = regex.lastIndex;
        }
        parts.push(str.slice(lastIndex));
        return parts;
    };
    return (
        <div className="relative text-white rounded-[4px]">
            <div className="bg-[rgb(255,255,255,0.08)] backdrop-blur-md px-8 py-4 rounded-[4px]">
                <span className="text-[16px] font-[400] gradient-text pr-10 block">{faqs[index].question}</span>
                <button
                    onClick={toggleFAQ}
                    className={`absolute right-8 top-1/2 -translate-y-1/2 text-[#987EFF] transform transition-transform duration-300 focus:outline-none w-7 h-7 flex items-center justify-center overflow-hidden ${isOpen ? 'rotate-45' : ''}`}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 17V9M9 9V1M9 9H1M9 9H17" stroke="#987EFF" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
            </div>
            <div
                className={`${isOpen ? 'max-h-screen bg-[rgb(255,255,255,0.04)] backdrop-blur-lg px-[32px] py-[24px]' : 'max-h-0 opacity-0'
                    } ease-in-out overflow-hidden transition-all duration-500 delay-100`}
            >
                <p className="pt-4 text-white text-opacity-60 text-[14px] font-[300] normal-case">
                    {parseText(faqs[index].answer)}
                </p>
                <p className="pt-4 text-[#987EFF] text-[14px] font-[500] hover:cursor-pointer" onClick={() => window.open(faqs[index].link, "_blank")}>
                    {faqs[index].linkText}
                </p>
            </div>
        </div>
    )
}

export default function Faq() {
    return (
        <div className="relative overflow-hidden w-full">
            <div className="flex flex-col bg-[#0c0c0c] justify-center items-center gap-[2rem] my-[7rem] w-full px-4 md:px-[10%]">
                <div className="absolute top-0 -left-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/bgstrip4.svg" alt="strip1" width={49} height={341} />
                </div>
                <div className="absolute top-0 -left-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/missingusdc.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-0 -right-[38%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/usdc.svg" alt="strip2" width={49} height={341} />
                </div>
                <div className="absolute top-[50%] -right-[48%] w-full h-full flex flex-col items-center justify-start pointer-events-none opacity-50">
                    <Image src="/missingusdc.svg" alt="strip4" width={49} height={341} />
                </div>
                <div className="text-center w-full md:w-[48%] mb-6 md:mb-0 z-20">
                    <h1 className="text-[32px] md:text-[40px] gradient-text font-[400]">{"FAQ's"}</h1>
                    <span className="text-white/60 text-[15px] md:text-[16px] font-[300]">
                        Everything you need to know before getting started with Encifher.
                    </span>
                </div>
                <div className="flex flex-col gap-[1rem] w-full md:w-[65%]">
                    {faqs.map((_, index) => (
                        <Question key={index} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}