"use client";
import Image from "next/image";
// import MatrixLetters from "@/decorations/MatrixLetters"
// import Navbar from "../Navbar/Navbar"
// import Button from '../Button/Button'
import UnderlinedText from "../Underlined/Underlined";
import { useState } from "react";

interface HeroProps {
  children?: React.ReactNode;
}

export default function Hero({ children }: HeroProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Join Waitlist");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!email || status === "Joined") return;
    if (!validateEmail(email)) {
      setStatus("Invalid Email");
      return;
    }
    try {
      setStatus("Joining...");
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error(await response.text());
      setStatus("Joined Waitlist");
    } catch (error) {
      setStatus("Join Waitlist");
      console.error(error);
    }
  };

  return (
    <>
      {children}
      <div className="relative bg-[#0c0c0c] min-h-[750px] md:min-h-[900px] w-full flex flex-col  items-center gap-8 pb-[200px]">
        <div className="absolute top-0 -left-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none md:z-0 -z-10">
          <Image src="/bgstrip3.svg" alt="strip1" width={49} height={341} />
        </div>
        <div className="absolute top-0 -left-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none md:z-0 -z-10">
          <Image src="/bgstrip1.svg" alt="strip2" width={49} height={341} />
        </div>
        <div className="absolute top-0 -right-[30%] w-full h-full flex flex-col items-center justify-start pointer-events-none md:z-0 -z-10">
          <Image src="/bgstrip2.svg" alt="strip2" width={49} height={341} />
        </div>
        <div className="absolute top-0 -right-[40%] w-full h-full flex flex-col items-center justify-start pointer-events-none md:z-0 -z-10">
          <Image src="/bgstrip4.svg" alt="strip4" width={49} height={341} />
        </div>

        <div className="flex flex-col md:flex-col items-center w-full pb-5 md:pb-12 z-20">
          <div className="group text-sm md:text-[20px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:mt-[74px] md:px-0 md:mb-[14px] ">
            <div className="flex items-center justify-center gap-2">
              <a 
                href="https://alliance.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-black/80 to-gray-900/70 rounded-full border border-gray-700/40 hover:from-gray-900/90 hover:to-gray-800/80 hover:border-gray-600/50 transition-all duration-300 cursor-pointer backdrop-blur-sm shadow-lg hover:shadow-xl"
              >
                <span className="text-white/80 text-sm font-mono">Backed by Alliance DAO</span>
                <Image
                  src="/AllianceMark_Light.png"
                  width={60}
                  height={18}
                  alt="Alliance DAO"
                  className="h-4 w-auto"
                />
              </a>
            </div>
          </div>
          <h1 className="text-3xl md:text-[40px] font-[400] gradient-text text-center leading-tight px-3 mt-[34px] md:mt-[54px] md:mb-[34px] mb-[32px] font-medium">
            Bringing <UnderlinedText>Privacy</UnderlinedText> To Solana Defi
          </h1>
          <div></div>
          <h1 className="text-sm md:text-[16px] font-[300] text-white/60 w-full md:w-1/2 text-center leading-relaxed px-4 md:px-0">
            unlocking best price execution without exposing your wallet
            <br />
            <span className="text-primary-brand-light">
              fast. secure. private.
            </span>
          </h1>
          <div className="flex flex-col md:flex-row items-center mt-[1rem] items-stretch w-full max-w-xs md:max-w-lg mx-auto md:mt-16">
            <input
              className="bg-white/5 px-4 py-2 w-full md:w-[310px] md:border-l md:border-y md:border-r-0 border md:rounded-l-[4px] md:rounded-r-[0px] rounded-[4px] border-white/10 text-[14px] text-white placeholder:text-white/40"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            <button
              className="bg-primary-brand/15 md:rounded-r-[4px] md:rounded-l-[0px] rounded-[4px] border border-primary-brand/30 text-primary-brand-light font-mono uppercase px-6 md:px-10 py-2 text-[14px] w-full md:w-auto mt-2 md:mt-0"
              onClick={handleSubmit}
            >
              {status}
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-full flex justify-center items-end pointer-events-none">
          <Image
            src="/bg.svg"
            alt="hero-image"
            className="hidden md:block w-auto max-w-auto md:h-[90%]"
            width={2000}
            height={1000}
          />
          <Image
            src="/mobilebg.svg"
            alt="hero-image-mobile"
            className="block md:hidden w-full h-[85vh] object-cover"
            width={2000}
            height={1000}
          />
          {/* <div className="block md:hidden absolute bottom-0 left-0 w-full h-[25px] pointer-events-none" style={{background: 'linear-gradient(to top, #0c0c0c 4%, transparent 100%)'}} /> */}
        </div>
        <div className="absolute left-1/2 bottom-10 transform -translate-x-1/2 w-full flex justify-center items-end pointer-events-none">
          <span className="text-white/60 text-xs font-lexend text-center flex flex-col items-center gap-2">
            Start your journey
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1_3466"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="18"
                height="18"
              >
                <rect
                  x="0.399414"
                  y="0.257782"
                  width="17.2012"
                  height="17.2012"
                  fill="#D9D9D9"
                />
              </mask>
              <g mask="url(#mask0_1_3466)">
                <path
                  d="M8.46235 3.483V12.1746L4.37975 8.09203L3.62451 8.85837L8.99988 14.2337L14.3753 8.85837L13.62 8.09203L9.53742 12.1746V3.483H8.46235Z"
                  fill="white"
                  fill-opacity="0.8"
                />
              </g>
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
