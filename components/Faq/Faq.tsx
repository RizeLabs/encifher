'use client'
import { useState } from "react"
import { faqs } from "./faqs"

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
                <a key={match.index} href={match[2]} className="font-[500] text-primary-brand" target="_blank" rel="noopener noreferrer">
                    {match[1]}
                </a>
            );
            lastIndex = regex.lastIndex;
        }
        parts.push(str.slice(lastIndex));
        return parts;
    };
    return (
        <div className="p-4 md:p-[3%] text-white  bg-zinc-900 rounded-[4px]">
            <div className="flex justify-between items-center gap-4 md:gap-0">
                <h3 className="text-[16px] font-[400] gradient-text">{faqs[index].question}</h3>
                <button
                    onClick={toggleFAQ}
                    className={`text-primary-brand transform transition-transform duration-300 text-2xl focus:outline-none ${isOpen ? 'rotate-45' : ''}`}
                >
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.5 17.9996C9.21667 17.9996 8.97917 17.9038 8.7875 17.7121C8.59583 17.5205 8.5 17.283 8.5 16.9996V9.99963H1.5C1.21667 9.99963 0.979167 9.9038 0.7875 9.71213C0.595833 9.52047 0.5 9.28297 0.5 8.99963C0.5 8.7163 0.595833 8.4788 0.7875 8.28713C0.979167 8.09547 1.21667 7.99963 1.5 7.99963H8.5V0.999634C8.5 0.7163 8.59583 0.4788 8.7875 0.287134C8.97917 0.0954671 9.21667 -0.000366211 9.5 -0.000366211C9.78333 -0.000366211 10.0208 0.0954671 10.2125 0.287134C10.4042 0.4788 10.5 0.7163 10.5 0.999634V7.99963H17.5C17.7833 7.99963 18.0208 8.09547 18.2125 8.28713C18.4042 8.4788 18.5 8.7163 18.5 8.99963C18.5 9.28297 18.4042 9.52047 18.2125 9.71213C18.0208 9.9038 17.7833 9.99963 17.5 9.99963H10.5V16.9996C10.5 17.283 10.4042 17.5205 10.2125 17.7121C10.0208 17.9038 9.78333 17.9996 9.5 17.9996Z" fill="#663FFF" />
                    </svg>

                </button>
            </div>
            <div
                className={`${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } ease-in-out overflow-hidden transition-all duration-500 delay-100`}
            >
                <p className="pt-4 text-white text-opacity-60 text-[16px] font-[300] normal-case">
                    {parseText(faqs[index].answer)}
                </p>
                <p className="pt-4 text-primary-brand text-[16px] font-[500] hover:cursor-pointer" onClick={() => window.open(faqs[index].link, "_blank")}>
                    {faqs[index].linkText}
                </p>
            </div>
        </div>
    )
}

export default function Faq() {
    return (
        <div className="flex flex-col bg-[#0c0c0c] md:flex-row gap-[2rem] my-[7rem] w-full px-4 md:px-[10%]">
            <div className="text-left w-full md:w-[48%] mb-6 md:mb-0 ">
                <h1 className="text-[32px] md:text-[40px] gradient-text font-[400]">{"FAQ's"}</h1>
                <span className="text-white/60 text-[15px] md:text-[16px] font-[300]">
                    Everything you need to know before getting started with Encifher.
                </span>
            </div>
            <div className="flex flex-col gap-[1rem] w-full md:w-[48%]">
                {faqs.map((_, index) => (
                    <Question key={index} index={index} />
                ))}
            </div>
        </div>
    )
}