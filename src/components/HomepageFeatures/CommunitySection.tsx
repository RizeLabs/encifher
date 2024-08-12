import React from "react";
import Marquee from "./Marquee";

export default function CommunitySection(): JSX.Element {
  return (
    <section className="relative" data-aos="fade-up" id="jointhecommunity">
        <div
        className="absolute w-full h-full bg-gradient-to-t from-[#141216] via-[#141216] via-15% to-[#14121600] pointer-events-none"
      />
      <div className="absolute left-1/2 transform -translate-x-1/2 uppercase text-white font-bold text-2xl sm:text-4xl md:text-5xl lg:text-[54px] bottom-[15%] text-center">
        Join the Community
      </div>
      <div className="px-5 py-3 md:px-3 flex gap-2 md:gap-3 bg-[#141216] bg-gradient-to-t from-[#141216] to-[#14121688] rounded-2xl">
        <img
          className="w-[44%]"
          alt="background image 1"
          src={require(`@site/static/assets/community/Image-1.webp`).default}
        />
        <img
          className="w-[27%]"
          alt="background image 2"
          src={require(`@site/static/assets/community/Image-2.webp`).default}
        />
        <div className="w-[30%] flex flex-col gap-2 md:gap-3">
          <img
            className="w-full h-1/2"
            alt="background image 3"
            src={require(`@site/static/assets/community/Image-3.webp`).default}
          />
          <img
            className="w-full h-1/2"
            alt="background image 4"
            src={require(`@site/static/assets/community/Image-4.webp`).default}
          />
        </div>
      </div>
    </section>
  );
}
