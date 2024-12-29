'use client'
import Image from 'next/image';
import Button from "../Button/Button";

export default function Exposed() {
    return (
        <div className="px-[5%] py-[2%]">
            <div
                className="flex flex-col items-center gap-[4rem] h-full w-full pt-[8%] border-gradient"
            >
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-[48px] font-[400] gradient-text">How Exposed Are You?</h1>
                    <h1 className="text-[20px] font-[300] text-white text-opacity-60 text-center">
                        Your Data is Already Public Check Now!
                    </h1>
                </div>
                <div className="flex items-center justify-between gap-4 w-[35%]">
                    <span className='h-full w-full input-gradient'>
                        <input
                            className="bg-transparent h-full w-full px-6 py-2 text-white text-opacity-60 text-[18px] font-[300] focus:outline-none"
                            placeholder="Put your X-handle or Wallet Address"
                        />
                    </span>
                    <Button text={
                        <Image src="/search.svg" height={10} width={10} alt='' className='h-[30px] w-[24px]' />
                    }
                        onClick={() => null}
                    />
                </div>
            </div>
        </div>
    );
}