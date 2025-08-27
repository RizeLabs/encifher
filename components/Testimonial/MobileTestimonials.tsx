"use client";

import { useRef, useState, useEffect } from "react";
import { testimonials, Testimonial } from "./Testimonial";

const MobileTestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const handleClick = () => {
    window.open(testimonial.link, "_blank");
  };

  return (
    <div
      className="bg-[#161616] backdrop-blur-md border border-white/10 rounded-lg p-3 cursor-pointer hover:bg-black/30 transition-all duration-300 overflow-hidden h-[140px] w-[240px] flex-shrink-0"
      onClick={handleClick}
    >
      <div className="w-full h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <img
            src={testimonial.dp}
            alt={testimonial.name}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
          <div className="border border-white/20 rounded-lg p-1.5">
            <svg
              className="w-3 h-3 text-white/60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-white font-mono text-xs font-semibold mb-1 line-clamp-1">
            {testimonial.name}
          </h4>
          <p className="text-white/60 font-mono text-[10px] mb-2 line-clamp-1">
            {testimonial.username}
          </p>

          <p className="text-white/80 font-mono text-[10px] leading-relaxed line-clamp-3">
            {testimonial.content}
          </p>

          {testimonial.isQt && (
            <div className="mt-2 bg-black/50 rounded border border-white/10 p-2">
              <div className="flex items-start gap-2">
                <img
                  src={testimonial.qtDp}
                  alt={testimonial.qtName}
                  className="w-6 h-6 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <h4 className="text-white font-mono text-[9px] font-semibold line-clamp-1">
                      {testimonial.qtName}
                    </h4>
                  </div>
                  <p className="text-white/80 font-mono text-[9px] leading-relaxed line-clamp-2">
                    {testimonial.qtContent}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MobileTestimonials() {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const [isFirstRowHovered, setIsFirstRowHovered] = useState(false);
  const [isSecondRowHovered, setIsSecondRowHovered] = useState(false);
  const firstRowPositionRef = useRef(-100);
  const secondRowPositionRef = useRef(0);

  useEffect(() => {
    let firstRowAnimationId: number;
    let secondRowAnimationId: number;

    // Mobile-optimized animation speed
    const speed = 2; // Slower for mobile to prevent motion sickness

    const animateFirstRow = () => {
      if (firstRowRef.current) {
        if (!isFirstRowHovered) {
          const newPosition = firstRowPositionRef.current + speed / 240;
          const finalPosition = newPosition >= 0 ? -100 : newPosition;
          firstRowPositionRef.current = finalPosition;
          firstRowRef.current.style.transform = `translateX(${finalPosition}%)`;
        } else {
          firstRowRef.current.style.transform = `translateX(${firstRowPositionRef.current}%)`;
        }
      }
      firstRowAnimationId = requestAnimationFrame(animateFirstRow);
    };

    const animateSecondRow = () => {
      if (secondRowRef.current) {
        if (!isSecondRowHovered) {
          const newPosition = secondRowPositionRef.current - speed / 240;
          const finalPosition = newPosition <= -100 ? 0 : newPosition;
          secondRowPositionRef.current = finalPosition;
          secondRowRef.current.style.transform = `translateX(${newPosition}%)`;
        } else {
          secondRowRef.current.style.transform = `translateX(${secondRowPositionRef.current}%)`;
        }
      }
      secondRowAnimationId = requestAnimationFrame(animateSecondRow);
    };

    animateFirstRow();
    animateSecondRow();

    return () => {
      cancelAnimationFrame(firstRowAnimationId);
      cancelAnimationFrame(secondRowAnimationId);
    };
  }, [isFirstRowHovered, isSecondRowHovered]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* First Row - moves left to right */}
      <div
        className="mb-8 overflow-hidden"
        onTouchStart={() => setIsFirstRowHovered(true)}
        onTouchEnd={() => setIsFirstRowHovered(false)}
      >
        <div
          ref={firstRowRef}
          className="flex space-x-3 items-start"
          style={{ transform: "translateX(-100%)" }}
        >
          {testimonials
            .slice(0, Math.ceil(testimonials.length / 2))
            .map((testimonial, index) => (
              <MobileTestimonialCard
                key={`mobile-first-${index}`}
                testimonial={testimonial}
              />
            ))}
        </div>
      </div>

      {/* Second Row - moves right to left */}
      <div
        className="overflow-hidden"
        onTouchStart={() => setIsSecondRowHovered(true)}
        onTouchEnd={() => setIsSecondRowHovered(false)}
      >
        <div
          ref={secondRowRef}
          className="flex space-x-3 items-start"
          style={{ transform: "translateX(0%)" }}
        >
          {testimonials
            .slice(Math.ceil(testimonials.length / 2), testimonials.length)
            .map((testimonial, index) => (
              <MobileTestimonialCard
                key={`mobile-second-${index}`}
                testimonial={testimonial}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
