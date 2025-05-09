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
        <div className="p-4 md:p-[3%] text-white faq-border">
            <div className="flex justify-between items-center gap-4 md:gap-0">
                <h3 className="text-[16px] md:text-[20px] font-[400] gradient-text">{faqs[index].question}</h3>
                <button
                    onClick={toggleFAQ}
                    className={`text-primary-brand transform transition-transform duration-300 text-2xl focus:outline-none ${isOpen ? 'rotate-90' : ''}`}
                >
                    {String.fromCharCode(isOpen ? 0x2716 : 0x271a)}
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
        <div className="flex flex-col items-center gap-[2rem] my-[7rem]">
            <div className="py-[4%] px-[10%] text-center">
                <h1 className="text-[48px] gradient-text font-[400]">{"FAQ's"}</h1>
            </div>
            <div className="flex flex-col gap-[1rem] w-[95%] md:w-[48%]">
                {faqs.map((_, index) => (
                    <Question key={index} index={index} />
                ))}
            </div>
        </div>
    )
}