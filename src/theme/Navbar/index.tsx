import React, { useState } from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps): JSX.Element {
  return (
    <nav className="max-w-[1440px] ml-auto mr-auto py-6 flex navbar lg:px-20 md:px-10 px-5">
      <div className="w-full md:max-w-none text-white flex justify-between items-center">
        <Link className="bg-transparent border-0" to="/">
          <img
            className="h-4 sm:h-6 hover:cursor-pointer"
            src={
              require(`@site/static/assets/header/encifherLogo.webp`).default
            }
            alt="logo"
          />
        </Link>
        <div className="flex gap-2 mid:gap-8 items-center">
          <a
            href="#getintouch"
            className="flex gap-2 hover:no-underline transition-colors duration-700 justify-center font-menseal items-center hover:cursor-pointer hover:opacity-95 self-end bg-custom-gradient py-2 px-2 md:px-6 text-[10px] sm:text-base md:text-lg font-semibold rounded-[60px] border-none text-white"
          >
            <span>Get in touch</span>
            <img
              className="h-[10px]"
              src={
                require(`@site/static/assets/header/down-arrow.webp`).default
              }
              alt="redirect btn"
            />
          </a>
          <button
            className="flex text-2xl sm:text-4xl md:text-5xl bg-transparent border-none hover:cursor-pointer"
            onClick={onMenuClick}
          >
            <img
              src={require(`@site/static/assets/menu-button.webp`).default}
              alt="Menu Button"
              className="w-8 h-3 sm:h-4 sm:w-10 cursor-pointer"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
