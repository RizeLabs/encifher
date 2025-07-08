"use client"

import { useState, useRef } from "react";

export function Video() {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        setPlaying(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 100);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-[#0c0c0c] text-white relative px-4">
            <div className="relative w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl aspect-video md:my-[90px] flex items-center justify-center rounded-2xl bg-white/10">
                {!playing && (
                    <button
                        className="absolute inset-0 flex items-center justify-center z-10 w-full h-full focus:outline-none"
                        onClick={handlePlay}
                        aria-label="Play video"
                    >
                        <span className="flex items-center justify-center hover:scale-110 transition-transform">
                            <svg
                                width="56" height="56"
                                className="w-14 h-14 md:w-[72px] md:h-[73px]"
                                viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M36.0005 6.5C30.0671 6.5 24.2669 8.25947 19.3334 11.5559C14.3999 14.8524 10.5547 19.5377 8.28412 25.0195C6.01349 30.5013 5.41939 36.5333 6.57694 42.3527C7.7345 48.1721 10.5917 53.5176 14.7873 57.7132C18.9829 61.9088 24.3284 64.766 30.1478 65.9236C35.9672 67.0811 41.9992 66.487 47.481 64.2164C52.9628 61.9458 57.6481 58.1006 60.9446 53.1671C64.241 48.2336 66.0005 42.4334 66.0005 36.5C66.0005 32.5603 65.2245 28.6593 63.7169 25.0195C62.2092 21.3797 59.9995 18.0726 57.2137 15.2868C54.4279 12.501 51.1208 10.2913 47.481 8.78361C43.8412 7.27597 39.9402 6.5 36.0005 6.5ZM30.0005 50V23L48.0005 36.5L30.0005 50Z" fill="#987EFF" />
                            </svg>
                        </span>
                    </button>
                )}
                <video
                    ref={videoRef}
                    src="/demo.mp4"
                    poster="/thumbnail.svg"
                    className="w-full h-full rounded-2xl object-cover"
                    controls={playing}
                    tabIndex={-1}
                />
            </div>
        </div>
    );
}