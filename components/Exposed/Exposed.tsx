'use client'
import Image from 'next/image';
import Button from "../Button/Button";
import UnderlinedText from '../Underlined/Underlined';

export default function Exposed() {
    return (
        <div className="mt-[7rem] mb-[15rem] px-[5%]">
            <div
                className="flex flex-col items-center gap-[4rem] h-full w-full pt-[7rem] border-gradient"
            >
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-[48px] font-[400] gradient-text">How <UnderlinedText>Exposed</UnderlinedText> Are You?</h1>
                    <h1 className="text-[20px] font-[300] text-white/60 text-center">
                        Your Data is Already Public Check Now!
                    </h1>
                </div>
                <div className="flex items-center justify-between gap-4 w-[35%]">
                    <span className='h-full w-full border border-white'>
                        <input
                            className="bg-transparent h-full w-full px-5 py-2 text-white/60 placeholder-white/60 text-[17px] font-[300] focus:outline-none"
                            placeholder="INPUT X-HANDLE OR WALLET ADDRESS"
                        />
                    </span>
                    <Button text={
                        <Image src="/search.svg" height={10} width={10} alt='' className='h-[24px] w-[24px]' />
                    }
                        onClick={() => null}
                    />
                </div>
            </div>
        </div>
    );
}