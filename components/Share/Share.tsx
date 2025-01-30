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
            className="w-[48px] h-[48px] bg-[#5024FF26] mr-4 border-[1.5px] border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer"
        >
            <Image src={image} width={25} height={25} alt={`${platform} Share Icon`} />
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
            className="w-[40px] h-[40px] bg-[#5024FF26] mr-4 border-[1.5px] border-[#5024FF40] rounded-lg flex justify-center items-center cursor-pointer"
        >
            <Image src={image} width={15} height={15} alt="Share Icon" />
        </div>
    );
}
