'use client'
// import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Button from "../Button/Button"
// import { motion, AnimatePresence } from "framer-motion"
import { FC } from "react";

interface NavbarProps {
  isMenuOpen: boolean;
  onMenuClick: () => void;
  onLogoClick: () => void;
}

const Navbar: FC<NavbarProps> = ({ isMenuOpen, onMenuClick, onLogoClick }) => {
  return (
    <div className="w-[100%] h-[3%] flex justify-between items-center px-4 md:px-10 py-4 md:py-7 sticky top-0 z-40 bg-[#0c0c0c]/90 backdrop-blur-md">
      <div className="flex items-center gap-2" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <Image width={120} height={30} src="/enc.svg" alt="logo" />
      </div>
      <div className="items-center gap-2 hidden md:flex">
        <Button text="Blogs" onClick={() => window.open("/blogs", "_blank")} className="px-4 py-2 text-sm text-white/60 bg-white/5 border-white/5 hover:bg-white/10" />
        <Button text="Docs" onClick={() => window.open("https://docs.encifher.io/docs/intro/", "_blank")} className="px-4 py-2 text-sm text-white/60 bg-white/5 border-white/5 hover:bg-white/10" />
        <Button text="Launch App" onClick={() => window.open("https://app.encifher.io", "_blank")} className="px-4 py-2 text-sm" />
      </div>
      <div className="md:hidden w-9 h-8 border-2 border-white/15 p-2 rounded-sm" onClick={onMenuClick}>
        <Image src={isMenuOpen ? "/cross.svg" : "/ham.svg"} width={10} height={10} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Navbar;