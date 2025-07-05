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
        <div className=" text-white   rounded-[4px]">
            <div className="flex justify-between bg-[rgb(255,255,255,0.08)] items-center gap-4 md:gap-0 px-8 py-4 rounded-[4px]">
                <h3 className="text-[16px] font-[400] gradient-text">{faqs[index].question}</h3>
                <button
                    onClick={toggleFAQ}
                    className={`text-[#987EFF] transform transition-transform duration-300 text-2xl focus:outline-none ${isOpen ? 'rotate-45' : ''}`}
                >
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18.2275C8.71667 18.2275 8.47917 18.1317 8.2875 17.94C8.09583 17.7484 8 17.5109 8 17.2275V10.2275H1C0.716667 10.2275 0.479167 10.1317 0.2875 9.94004C0.0958333 9.74837 0 9.51087 0 9.22754C0 8.9442 0.0958333 8.70671 0.2875 8.51504C0.479167 8.32337 0.716667 8.22754 1 8.22754H8V1.22754C8 0.944206 8.09583 0.706706 8.2875 0.515039C8.47917 0.323372 8.71667 0.227539 9 0.227539C9.28333 0.227539 9.52083 0.323372 9.7125 0.515039C9.90417 0.706706 10 0.944206 10 1.22754V8.22754H17C17.2833 8.22754 17.5208 8.32337 17.7125 8.51504C17.9042 8.70671 18 8.9442 18 9.22754C18 9.51087 17.9042 9.74837 17.7125 9.94004C17.5208 10.1317 17.2833 10.2275 17 10.2275H10V17.2275C10 17.5109 9.90417 17.7484 9.7125 17.94C9.52083 18.1317 9.28333 18.2275 9 18.2275Z" fill="#987EFF"/>
</svg>


                </button>
            </div>
            <div
                className={`${isOpen ? 'max-h-screen bg-[rgb(255,255,255,0.04)] px-[32px] py-[24px]' : 'max-h-0 opacity-0'
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