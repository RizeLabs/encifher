import { ReactNode } from "react";
import Image from "next/image";
interface ButtonProps {
    text: ReactNode;
    onClick: () => void;
    className?: string;
}

export default function Button({ text, onClick, className }: ButtonProps) {
    return (
        <div
            className={
                       `text-primary-brand-light bg-primary-brand/15 border-primary-brand/25 border px-4 py-2
                       backdrop-blur-[25px] flex items-center justify-center hover:cursor-pointer text-sm font-[300]
                       transition-all duration-300 hover:bg-primary-brand/25 ${className}`
            }
            onClick={onClick}
        >
            
            {text === "Blogs" && <Image src="/blog.svg" alt="button-image" width={20} height={20} className="mr-2" />}
            {text === "Docs" && <Image src="/docs.svg" alt="button-image" width={20} height={20} className="mr-2" />}
            {text}
            {text === "Launch App" && <Image src="/launch.svg" alt="button-image" width={20} height={20} className="ml-2" />}
        </div>
    )
}