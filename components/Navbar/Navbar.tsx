'use client'
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Button from "../Button/Button"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tmpText, setTmpText] = useState<string>("Launch app")
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const menuVariants = {
        hidden: { x: "100%" },
        visible: { x: 0 },
        exit: { x: "100%", transition: { duration: 0.2, ease: "easeInOut" } },
    };

    useEffect(() => {
        const handleTouch = (e: TouchEvent) => {
            const target = e.target as Node;
            if (menuRef.current && menuRef.current.contains(target) && !buttonsRef.current?.contains(target))
                setIsOpen(false);
        };
        window.addEventListener("touchstart", handleTouch);
        return () => {
            window.removeEventListener("touchstart", handleTouch);
        };
    }, [isOpen]);

    return (
        <div
            className="w-[100%] h-[3%] flex justify-between items-center px-4 md:px-10 py-4 md:py-7"
        >
            <div className="flex items-center gap-2">
                <Image width={120} height={30} src="/enc.svg" alt="logo" />
            </div>
            <div className="items-center gap-2 hidden md:flex">
                <Button text="Blogs" onClick={() => window.open("/blogs", "_blank")} className="px-4 py-2 text-sm text-white/60 bg-white/5 border-white/5 hover:bg-white/10" />
                <Button text="Docs" onClick={() => window.open("https://docs.encifher.io/docs/intro/", "_blank")} className="px-4 py-2 text-sm text-white/60 bg-white/5 border-white/5 hover:bg-white/10" />
                {/* <div onMouseEnter={() => setTmpText("Coming soon")} onMouseLeave={() => setTmpText("Launch app")}><Button text={tmpText} onClick={() => null} className="px-4 py-2 text-sm w-[127px]" /></div> */}
                <Button text="Launch App" onClick={() => window.open("https://monad.encifher.io", "_blank")} className="px-4 py-2 text-sm" />
            </div>
            <div className="md:hidden w-9 h-8 border-2 border-white/15 p-2 rounded-sm" onClick={() => setIsOpen(!isOpen)}>
                <Image src={isOpen ? "/cross.svg" : "/ham.svg"} width={10} height={10} alt="" className="w-full h-full" />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="w-full h-full absolute flex flex-col items-center gap-4 bg-black top-16 right-0 z-50"
                        ref={menuRef}
                    >
                        <div className="absolute top-1/3 left-[10%] -translate-y-[30%] flex flex-col gap-4 w-full justify-center" ref={buttonsRef}>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                            >
                                <Button text="Blogs" onClick={() => console.log("Docs")} className="w-[80%] px-4 py-2 text-lg text-white/60 bg-white/5 border-white/5 hover:bg-white/10 select-none" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
                            >
                                <Button text="Docs" onClick={() => window.open("https://docs.encifher.io/docs/intro/", "_blank")} className="w-[80%] px-4 py-2 text-lg text-white/60 bg-white/5 border-white/5 hover:bg-white/10 select-none" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
                            >
                                <Button text="Launch App" onClick={() => window.open("https://monad.encifher.io", "_blank")} className="w-[80%] px-4 py-2 text-lg select-none" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}