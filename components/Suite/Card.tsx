'use client'
import Image from "next/image"

interface CardProps {
    icon: string;
    title: string;
    description: string;
    onClick: () => void;
}

export const Card = ({ icon, title, description }: CardProps) => {
    return (
        <div className="flex flex-col items-center md:items-start card-border w-full">
            <Image src={icon} width={20} height={20} alt="" className="w-[98%]" />
            <div className="flex flex-col items-center md:items-start w-[90%] md:w-full p-2 md:p-[2rem] h-[50%]">
                <h2 className="text-xl md:text-[32px] gradient-text font-[400] leading-relaxed md:leading-tight">{title}</h2>
                <p className="text-[16px] md:text-[20px] text-white/60 font-[300] pt-[1rem]">{description}</p>
            </div>
            {/* <Button text="Learn More" onClick={onClick} className="mx-2 md:mx-[2rem] mt-4 md:mt-0 mb-[2rem]" /> */}
        </div>
    )
} 