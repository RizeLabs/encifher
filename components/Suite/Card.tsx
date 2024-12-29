'use client'
import Image from "next/image"
import Button from "../Button/Button";

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

export const Card = ({ icon, title, description }: CardProps) => {
    return (
        <div className="flex flex-col items-start card-border w-full">
            <Image src={icon} width={20} height={20} alt="" className="w-[98%]" />
            <div className="flex flex-col items-start w-full p-[2rem] h-[50%]">
                <h2 className="text-[32px] gradient-text font-[400]">{title}</h2>
                <p className="text-[20px] text-white/60 font-[300] pt-[1rem]">{description}</p>
            </div>
            <Button text="Learn More" onClick={() => null} className="mx-[2rem] mb-[2rem]" />
        </div>
    )
} 