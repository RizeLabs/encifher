import React from "react";
import Marquee from "./Marquee";

export default function HeaderSection(): JSX.Element {
  return (
    <section className="relative">
      <img
        className="absolute mix-blend-screen bottom-0 pointer-events-none"
        alt="background image"
        src={require(`@site/static/assets/bg-image1.png`).default}
      />
      <div className="w-screen lg:px-20 md:px-10 px-5 pt-16 pb-8 md:pt-20 md:pb-10 flex flex-col items-start gap-24 text-white">
        <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto lg:mt-4">
          <div className="flex gap-20 lg:gap-32 md:flex-row flex-col">
            <div className="flex flex-col w-full">
              <div className="text-4xl uppercase font-medium">
                Open-Source Code is good.
              </div>
              <div className="lg:text-[64px] text-6xl uppercase mt-10 font-bold">
                But Open-Source Value is not!
              </div>
              <div className="flex mt-20 gap-2 md:gap-8 items-center">
                <div className="text-xl max-w-[300px]">
                  World's first solution for encrypting <span className="font-bold">Bitcoin</span>
                </div>
                <a className="bg-transparent border-none" href="#eventsandnews">
                  <img
                    className="w-full h-16 hover:cursor-pointer hover:opacity-75"
                    src={
                      require(`@site/static/assets/down-arrow-circle-btn.png`)
                        .default
                    }
                    alt="Link button"
                  />
                </a>
              </div>
            </div>
            <img
              className="w-full md:w-[400px]"
              src={require(`@site/static/assets/video.png`).default}
              alt="Video"
            />
          </div>
        </div>
      </div>
      <div className="rounded-t-[40px] rounded-b-none border border-t-[1px] border-r-[1px] border-b-0 border-l-[1px] border-gray-600 border-solid py-[6px] overflow-hidden">
        <Marquee />
      </div>
    </section>
  );
}
