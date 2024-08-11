import React, { useState } from "react";
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps): JSX.Element {
  
  return (
    <div className="w-screen lg:px-20 md:px-10 px-5 py-6 flex">
      <div className="w-full md:max-w-none text-white flex justify-between items-center">
        <Link className="bg-transparent border-0" to="/">
          <img
            className="h-4 sm:h-6 hover:cursor-pointer"
            src={require(`@site/static/assets/header/logo.png`).default}
          />
        </Link>
        <div className="flex gap-8 items-center">
          <a
            href="#getintouch"
            className="flex gap-2 hover:no-underline transition-colors duration-700 justify-center font-menseal items-center hover:cursor-pointer hover:opacity-95 self-end bg-custom-gradient py-2 px-2 md:px-6 text-base md:text-lg font-semibold rounded-[60px] border-none text-white"
          >
            <span>Get in touch</span>
            <img
              className="h-[10px]"
              src={require(`@site/static/assets/header/down-arrow.png`).default}
            />
          </a>
          <button
            className="flex text-4xl md:text-5xl bg-transparent border-none hover:cursor-pointer"
            onClick={onMenuClick}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "white" }}
            >
              <path
                fill-rule="evenodd"
                d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
