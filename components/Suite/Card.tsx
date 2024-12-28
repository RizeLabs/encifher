import Image from "next/image"

interface CardProps {
    icon: string;
    title: string;
    description: string;
}

export const Card = ({ icon, title, description }: CardProps) => {
    return (
        <div className="flex flex-col items-center py-4 card-border">
            <Image src={icon} width={20} height={20} alt="" className="w-[98%]" />
            <div className="flex flex-col items-start w-full p-[5%] pr-[8rem] pb-[2rem]">
                <h2 className="text-[32px] gradient-text font-[400]">{title}</h2>
                <p className="text-[20px] text-white text-opacity-60 font-[300] pt-[1rem]">{description}</p>
            </div>
        </div>
    )
} 