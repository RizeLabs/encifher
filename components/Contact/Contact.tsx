'use client'
import Image from "next/image";
import Button from "../Button/Button";

export default function Contact() {
    return (
        <>
            <div className="px-[5%] py-[2%]">
                <div
                    className="flex flex-col items-center gap-[4rem] h-full w-full py-[8%] border-gradient-b"
                >
                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-[48px] font-[400] gradient-text">Privacy Without Compromise</h1>
                        <h1 className="text-[20px] font-[300] text-white text-opacity-60 text-center">
                            Join the movement for compliant privacy in DeFi
                        </h1>
                    </div>
                    <div className="flex items-center justify-around gap-1 w-[41%]">
                        <span className='h-full w-[62%] input-gradient'>
                            <input
                                className="bg-transparent h-full w-full px-6 py-2 text-white text-opacity-60 text-[18px] font-[300] focus:outline-none"
                                placeholder="Enter email ID"
                            />
                        </span>
                        <Button
                            className="w-[36%]"
                            text="Join the waitlist"
                            onClick={() => null}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-[10rem] mb-[5rem] flex flex-col items-center justify-center gap-[6rem] px-[3%]">
                <div className="flex items-center justify-around gap-4">
                    <Button text={
                        <Image src="/x.svg" height={20} width={20} alt="" className="h-[40px] w-[24px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/telegram.svg" height={20} width={20} alt="" className="h-[40px] w-[28px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/discord.svg" height={20} width={20} alt="" className="h-[40px] w-[28px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/github.svg" height={20} width={20} alt="" className="h-[40px] w-[28px]" />
                    }
                        onClick={() => null}
                    />
                </div>
            </div>
            {/* <div className="relative h-[40vh] overflow-hidden">
                <p className="absolute bottom-[-7rem] left-1/2 transform -translate-x-1/2 text-[275px] font-[400] text-transparent text-clip bg-clip-text bg-white">
                    ENCIFHER
                    <GlowingText />
                </p>
            </div> */}
        </>
    );
}