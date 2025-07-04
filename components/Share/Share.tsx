import Image from "next/image";

interface ShareInterface {
    image: string;
    platform: "twitter" | "telegram"; 
}

export default function Share({ image, platform }: ShareInterface) {
    const sharePage = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out this amazing blog by Encifher!");

        let shareUrl = "";
        if (platform === "twitter") {
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        } else if (platform === "telegram") {
            shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        }

        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            onClick={sharePage}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5024FF26] mr-2 sm:mr-4 border border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer"
        >
            <Image src={image} width={25} height={25} alt={`${platform} Share Icon`} className="w-5 h-5 sm:w-[25px] sm:h-[25px]" />
        </div>
    );
}

export function MiniShare({ image }: ShareInterface) {
    const shareToTwitter = () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent("Check out this amazing blog by Encifher!");
        const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        
        window.open(twitterShareUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <div
            onClick={shareToTwitter}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5024FF26] mr-2 sm:mr-4 border border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer"
        >
            <Image src={image} width={15} height={15} alt="Share Icon" className="w-4 h-4 sm:w-[15px] sm:h-[15px]" />
        </div>
    );
}
