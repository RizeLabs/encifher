import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

interface NewsStripProps {
  message: string;
  linkText: string;
  linkHref: string;
}

function NewsStrip({ message, linkText, linkHref }: NewsStripProps): JSX.Element {
  // Split the message into parts
  const parts = message.split(linkText);
  
  return (
    <div
      role="banner"
      aria-label="Seed Funding Announcement"
      className="bg-[#E7E7E9] flex gap-2 md:gap-6 items-center justify-center text-secondary-dark text-center text-xs sm:text-sm md:text-lg font-menseal font-semibold"
    >
      
      <p className="mb-0">
        {parts[0]}
        <a href={linkHref} target="_blank" className="text-primary-brand underline hover:opacity-95">
          {linkText}
        </a>
        {parts[1]}
      </p>
    </div>
  );
}

export default function Navbar({ onMenuClick }: NavbarProps): JSX.Element {
  return (
    <header className="relative">
      <NewsStrip
        message="Our Devnet V0 closing soon!"
        linkText="Devnet V0"
        linkHref="https://docs.encifher.io"
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="max-w-[1440px] ml-auto mr-auto py-6 flex navbar lg:px-20 md:px-10 px-5"
      >
        <div className="w-full md:max-w-none text-white flex justify-between items-center">
          <Link
            to="/"
            className="bg-transparent border-0"
            aria-label="Homepage"
          >
            <img
              className="h-4 sm:h-6 hover:cursor-pointer"
              src={
                require(`@site/static/assets/header/encifherLogo.webp`).default
              }
              alt="Encifher logo"
            />
          </Link>
          <div className="flex gap-2 mid:gap-8 items-center">
            <a
              href="https://app.encifher.io/"
              target="_blank"
              className="flex gap-2 hover:no-underline transition-colors duration-700 justify-center font-menseal items-center hover:cursor-pointer hover:opacity-95 self-end bg-custom-gradient py-2 px-2 md:px-6 text-[10px] sm:text-base md:text-lg font-semibold rounded-[60px] border-none text-white"
              aria-label="Get in touch"
            >
              <span>Launch App</span>
              {/* <img
                className="h-[10px]"
                src={
                  require(`@site/static/assets/header/down-arrow.webp`).default
                }
                alt="Down arrow"
              /> */}
            </a>
            <button
              className="flex text-2xl sm:text-4xl md:text-5xl bg-transparent border-none hover:cursor-pointer"
              onClick={onMenuClick}
              aria-label="Menu"
            >
              <img
                src={require(`@site/static/assets/menu-button.webp`).default}
                alt="Menu button"
                className="w-8 h-3 sm:h-4 sm:w-10 cursor-pointer"
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
