import React from "react";
import "./styles.module.css";

const MarqueeItem = ({ text, imageSrc }) => (
  <>
    <span>{text}</span>
    <img className="h-6 w-6" src={imageSrc} alt="marquee icon" />
  </>
);

const Marquee = () => {
  const items = ["secure", "fast", "trustworthy", "reliable"];
  const imageSrc = require(`@site/static/assets/marquee-shape.webp`).default;

  return (
    <div className="overflow-hidden whitespace-nowrap bg-transparent text-[#E7E7E9] py-2 flex font-bold text-2xl uppercase">
      {Array(5).fill(null).map((_, index) => (
        <div className="flex space-x-8 animate-marquee px-16 items-center" key={index}>
          {items.map((item, idx) => (
            <MarqueeItem key={idx} text={item} imageSrc={imageSrc} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
