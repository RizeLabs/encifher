import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

interface NewsStripProps {
  message: string;
}

function NewsStrip({ message }: NewsStripProps): JSX.Element {
  return (
    <div
      role="banner"
      aria-label="Seed Funding Announcement"
      className="bg-[#E7E7E9] flex gap-2 md:gap-6 items-center justify-center text-secondary-dark text-center text-xs sm:text-sm md:text-lg font-menseal font-semibold"
    >
      <img
        className="h-8 w-8 md:h-12 md:w-12"
        src={require(`@site/static/assets/megaphone.webp`).default}
        alt="Encifher logo"
      />
      <p className="mb-0">{message}</p>
      <img
        className="h-8 w-8 md:h-12 md:w-12 "
        src={require(`@site/static/assets/megaphone.webp`).default}
        alt="Encifher logo"
        style={{ transform: "rotateY(180deg)" }}
      />
    </div>
  );
}

export default function Navbar({ onMenuClick }: NavbarProps): JSX.Element {
  return (
    <header className="relative">
      <NewsStrip message="We’ve just raised our seed funding!" />

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
              href="#getintouch"
              className="flex gap-2 hover:no-underline transition-colors duration-700 justify-center font-menseal items-center hover:cursor-pointer hover:opacity-95 self-end bg-custom-gradient py-2 px-2 md:px-6 text-[10px] sm:text-base md:text-lg font-semibold rounded-[60px] border-none text-white"
              aria-label="Get in touch"
            >
              <span>Get in touch</span>
              <img
                className="h-[10px]"
                src={
                  require(`@site/static/assets/header/down-arrow.webp`).default
                }
                alt="Down arrow"
              />
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
