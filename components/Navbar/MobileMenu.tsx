import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Button from "../Button/Button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBlogsClick: () => void;
  onDocsClick: () => void;
  onLaunchAppClick: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
          className="fixed top-16 left-0 right-0 bottom-0 z-50"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={onClose}
          />
          {/* Menu Panel */}
          <div
            className="relative w-full h-fit bg-[#151515] flex flex-col justify-center px-[40px] py-[24px] z-10 shadow-[0_80px_200px_0_rgba(0,0,0,0.7)]"
            ref={buttonsRef}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
            >
              {/* BLOGS link */}
              <a
                href="/blogs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full mx-auto px-4 py-2 text-[14px] font-mono uppercase text-white/80 bg-white/10 border border-white/10 rounded-[4px] mt-[16px] focus:outline-none"
              >
                <span className="mr-3">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_252_1095" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                      <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_252_1095)">
                      <path d="M6.04102 14.4587H11.4577V13.2087H6.04102V14.4587ZM6.04102 11.1253H13.9577V9.87533H6.04102V11.1253ZM6.04102 7.79199H13.9577V6.54199H6.04102V7.79199ZM4.42247 17.5837C4.0015 17.5837 3.64518 17.4378 3.35352 17.1462C3.06185 16.8545 2.91602 16.4982 2.91602 16.0772V4.92345C2.91602 4.50248 3.06185 4.14616 3.35352 3.85449C3.64518 3.56283 4.0015 3.41699 4.42247 3.41699H15.5762C15.9972 3.41699 16.3535 3.56283 16.6452 3.85449C16.9368 4.14616 17.0827 4.50248 17.0827 4.92345V16.0772C17.0827 16.4982 16.9368 16.8545 16.6452 17.1462C16.3535 17.4378 15.9972 17.5837 15.5762 17.5837H4.42247ZM4.42247 16.3337H15.5762C15.6404 16.3337 15.6991 16.3069 15.7525 16.2535C15.8059 16.2001 15.8327 16.1414 15.8327 16.0772V4.92345C15.8327 4.85928 15.8059 4.80053 15.7525 4.7472C15.6991 4.69373 15.6404 4.66699 15.5762 4.66699H4.42247C4.35831 4.66699 4.29956 4.69373 4.24622 4.7472C4.19275 4.80053 4.16602 4.85928 4.16602 4.92345V16.0772C4.16602 16.1414 4.19275 16.2001 4.24622 16.2535C4.29956 16.3069 4.35831 16.3337 4.42247 16.3337Z" fill="white" fill-opacity="0.8" />
                    </g>
                  </svg>
                </span>
                BLOGS
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
            >
              {/* DOCS link */}
              <a
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center w-full mx-auto px-4 py-2 text-[14px] font-mono uppercase text-white/80 bg-white/10 border border-white/10 rounded-[4px] my-[16px] focus:outline-none"
              >
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_252_1100" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                    <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_252_1100)">
                    <path d="M6.82687 11.0445H13.1731V9.79447H6.82687V11.0445ZM6.82687 13.4484H13.1731V12.1984H6.82687V13.4484ZM6.82687 15.8522H10.6731V14.6022H6.82687V15.8522ZM5.25646 18.4163C4.83549 18.4163 4.47917 18.2705 4.1875 17.9788C3.89583 17.6872 3.75 17.3309 3.75 16.9099V4.08947C3.75 3.66849 3.89583 3.31217 4.1875 3.02051C4.47917 2.72884 4.83549 2.58301 5.25646 2.58301H11.875L16.25 6.95801V16.9099C16.25 17.3309 16.1042 17.6872 15.8125 17.9788C15.5208 18.2705 15.1645 18.4163 14.7435 18.4163H5.25646ZM11.25 7.58301V3.83301H5.25646C5.19229 3.83301 5.13354 3.85974 5.08021 3.91322C5.02674 3.96655 5 4.0253 5 4.08947V16.9099C5 16.9741 5.02674 17.0328 5.08021 17.0861C5.13354 17.1396 5.19229 17.1663 5.25646 17.1663H14.7435C14.8077 17.1663 14.8665 17.1396 14.9198 17.0861C14.9733 17.0328 15 16.9741 15 16.9099V7.58301H11.25Z" fill="white" fill-opacity="0.8" />
                  </g>
                </svg>

                <span className="pl-3"> DOCS</span>
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            >
              {/* LAUNCH APP link */}
              <a
                href="https://app.encifher.com" // replace with your actual app URL
                target="_blank"
                rel="noopener noreferrer"
                className="flex mb-[16px] items-center justify-between w-full mx-auto px-4 py-2 text-[14px] font-mono uppercase text-primary-brand-light bg-primary-brand/10 border border-primary-brand/40 rounded-[4px] focus:outline-none"
              >
                <span>LAUNCH APP</span>
                <span className="ml-3">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_252_1107" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                      <rect y="0.5" width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_252_1107)">
                      <path d="M5.24521 15.2035L4.375 14.3333L12.5754 6.125H5.12021V4.875H14.7035V14.4583H13.4535V7.00313L5.24521 15.2035Z" fill="white" fill-opacity="0.8" />
                    </g>
                  </svg>
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 