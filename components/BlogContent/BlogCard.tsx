import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface BlogCardInterface {
  slug: string;
  title: string;
  image: string;
  readtime: string;
  date: string;
  content: string;
}

export default function BlogCard({
  slug,
  title,
  image,
  readtime,
  date,
  content,
}: BlogCardInterface) {
  const clock = "/clock.svg";
  const calendar = "/calendar.svg";

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (!cardContainerRef.current) return;

    const threshold = 600;
    const margin = 20;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;

        if (!isVertical && width < threshold - margin) {
          setIsVertical(true);
        } else if (isVertical && width > threshold + margin) {
          setIsVertical(false);
        }
      }
    });

    observer.observe(cardContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isVertical]);

  const containerClasses = isVertical ? "flex flex-col" : "flex flex-row";
  const textContainerClasses = isVertical ? "w-full" : "w-1/2";
  const imageContainerClasses = isVertical ? "w-full mt-8" : "w-1/2 ml-4";

  return (
    <>
      <div ref={cardContainerRef} className={containerClasses}>
        {/* Text Section */}
        <div className={textContainerClasses}>
          <span
            className="cursor-pointer text-white text-xl"
            onClick={() => (window.location.href = `/blog/${slug}`)}
          >
            {title}
          </span>

          <span className="flex flex-row my-4 opacity-50">
            <span className="flex flex-row text-white text-sm mr-6">
              <Image
                src={clock}
                width={20}
                height={20}
                alt="Clock Icon"
                className="mr-2"
              />
              {readtime} min read
            </span>
            <span className="flex flex-row text-white text-sm">
              <Image
                src={calendar}
                width={16}
                height={16}
                alt="Calendar Icon"
                className="mr-2"
              />
              {date}
            </span>
          </span>

          <div className="text-white text-[14.5px] opacity-50 normal-case">
            {content}
          </div>
        </div>

        <div className={imageContainerClasses}>
          <Image
            src={image}
            alt="Blog Image"
            layout="responsive"
            width={500}
            height={100}
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full h-[1px] bg-white opacity-50 my-8"></div>
    </>
  );
}
