'use client'
import Image from "next/image";
import Button from "../Button/Button";
import UnderlinedText from "../Underlined/Underlined";

export default function Contact() {
    return (
        <>
            <div className="px-[5%] py-[2%]">
                <div
                    className="flex flex-col items-center gap-[4rem] h-full w-full py-[8%] border-gradient-b"
                >
                    <div className="flex flex-col items-center gap-4 md:gap-8 text-center">
                        <h1 className="text-2xl md:text-[48px] font-[400] gradient-text">Privacy <UnderlinedText>Without</UnderlinedText> Compromise</h1>
                        <h1 className="text-md md:text-[20px] font-[300] text-white/60 text-center px-4 md:px-0">
                            Join the movement for compliant privacy in DeFi
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-3">
                        <span className='h-full border min-w-[20px] md:min-w-[400px]'>
                            <input
                                className="bg-transparent h-full w-full px-6 py-2 text-white/60 text-sm font-[300] focus:outline-none"
                                placeholder="ENTER EMAIL ID"
                            />
                        </span>
                        <Button
                            className="max-w-[300px]"
                            text="Join the waitlist"
                            onClick={() => null}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-[10rem] mb-[5rem] flex flex-col items-center justify-center gap-6 px-[3%] h-[calc(10vh-14rem)]">
                <div className="flex items-center justify-around gap-2 md:gap-4">
                    <Button text={
                        <Image src="/x.svg" height={20} width={20} alt="" className="h-[18px] w-[18px] md:h-[40px] md:w-[24px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/telegram.svg" height={20} width={20} alt="" className="h-[18px] w-[18px] md:h-[40px] md:w-[28px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/discord.svg" height={20} width={20} alt="" className="h-[18px] w-[18px] md:h-[40px] md:w-[28px]" />
                    }
                        onClick={() => null}
                    />
                    <Button text={
                        <Image src="/github.svg" height={20} width={20} alt="" className="h-[18px] w-[18px] md:h-[40px] md:w-[28px]" />
                    }
                        onClick={() => null}
                    />
                </div>
                <div className="text-center text-white/60 text-sm font-[300]">© 2024 Rize Labs, HQ Singapore</div>
            </div>
        </>
    );
}