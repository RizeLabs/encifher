import Image from "next/image"

interface ShareInterface {
    image: string;
}

export default function Share({image}: ShareInterface) {
    return (
        <div className="w-[58px] h-[58px] bg-[#5024FF26] mr-4 border-[1.5px] border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer">
            <Image src={image} width={30} height={30} alt="Share Icon" />
        </div>
    )
}

export function MiniShare({image}: ShareInterface) {
    return (
        <div className="w-[40px] h-[40px] bg-[#5024FF26] mr-4 border-[1.5px] border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer">
            <Image src={image} width={15} height={15} alt="Share Icon" />
        </div>
    )
}