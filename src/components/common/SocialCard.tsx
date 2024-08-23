import React from "react";

interface SocialCardProps {
  socialIconUrl: string;
  text: string;
  linkUrl: string;
  hoverColor: string;
}

const SocialCard: React.FC<SocialCardProps> = ({
  socialIconUrl,
  text,
  linkUrl,
  hoverColor,
}) => {
  return (
    <a
      className="relative w-[290px] h-[208px] bg-transparent border border-solid border-[#5F5F68] flex flex-col justify-between"
      style={{ transition: "background-color 0.3s" }}
      href={linkUrl}
      target="_blank"
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
    >
      <div className="absolute top-10 left-10">
        <img src={socialIconUrl} alt="Social Icon" className="w-12 h-12" />
      </div>
      {/* <a
        href={linkUrl}
        className="absolute top-10 right-10 bg-white rounded-full shadow-md w-16 h-16"
        target="_blank"
      >
        <img
          src={require(`@site/static/assets/top-right-arrow-btn.webp`).default}
          alt="Arrow Button"
          className="w-full h-full object-contain"
        />
      </a> */}
      <div className="absolute bottom-2 left-10  text-white text-left text-3xl font-bold pb-4">
        {text}
      </div>
      <div className="absolute bottom-[-1px] right-[-1px] w-[30px] h-[30px] bg-secondary-dark border-solid border border-r-0 border-b-0 border-[#5F5F68]"></div>
    </a>
  );
};

export default SocialCard;
