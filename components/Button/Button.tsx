import { ReactNode } from "react";

interface ButtonProps {
    text: ReactNode;
    onClick: () => void;
    className?: string;
}

export default function Button({ text, onClick, className }: ButtonProps) {
    return (
        <div
            className={`bg-grad-blue px-[24px] py-[6px] rounded-[12px]
                       backdrop-blur-[25px] flex items-center justify-center hover:cursor-pointer
                       transition-all duration-500 delay-300 hover:bg-grad-blue-hover button-gradient ${className}`}
            onClick={onClick}
        >
            <p className="gradient-text text-[20px] font-[300]">{text}</p>
        </div>
    )
}