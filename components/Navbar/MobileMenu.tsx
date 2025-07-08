import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBlogsClick: () => void;
  onDocsClick: () => void;
  onLaunchAppClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, onBlogsClick, onDocsClick, onLaunchAppClick }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const menuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%", transition: { duration: 0.2, ease: "easeInOut" } },
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleTouch = (e: TouchEvent) => {
      const target = e.target as Node;
      if (menuRef.current && menuRef.current.contains(target) && !buttonsRef.current?.contains(target))
        onClose();
    };
    window.addEventListener("touchstart", handleTouch);
    return () => {
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [isOpen, onClose]);

  return (
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
              <Button text="Blogs" onClick={onBlogsClick} className="w-[80%] px-4 py-2 text-lg text-white/60 bg-white/5 border-white/5 hover:bg-white/10 select-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
            >
              <Button text="Docs" onClick={onDocsClick} className="w-[80%] px-4 py-2 text-lg text-white/60 bg-white/5 border-white/5 hover:bg-white/10 select-none" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            >
              <Button text="Launch App" onClick={onLaunchAppClick} className="w-[80%] px-4 py-2 text-lg select-none" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 