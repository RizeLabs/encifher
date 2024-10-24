import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  imageUrl?: string;
  heading: string;
  description: string;
  url: string;
  topic: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  heading,
  description,
  url,
  topic,
}) => {
  const DEFAULT_IMAGE_URL =
    require(`@site/static/assets/random-image.webp`).default;

  return (
    <div className="max-w-[320px] mid:max-w-[400px] border hover:shadow-primary-purple border-solid border-[#5F5F68] overflow-hidden shadow-md flex flex-col bg-secondary-dark rounded-2xl">
      <div className="relative bg-pink-950 flex-shrink-0 max-w-[320px] mid:max-w-[400px] mid:h-[250px]">
        <img
          src={imageUrl || DEFAULT_IMAGE_URL}
          alt={heading}
          className="w-full h-full"
        />
      </div>
      <div className="p-8 bg-primary-dark h-full flex flex-col">
        <h4 className="shadow-md flex w-auto font-menseal text-primary-brand text-base font-semibold hover:no-underline capitalize">
          {topic}
        </h4>
        <h2 className="text-xl font-semibold text-white font-menseal uppercase mb-3">
          {heading}
        </h2>
        <p className="text-lg text-[#E7E7E9B8] font-sora line-clamp-2 mb-6">
          {description}
        </p>
        <Link
          to={url}
          className="shadow-md flex w-auto text-base font-semibold hover:no-underline hover:opacity-80 hover:text-white
          bg-primary-brand text-white px-5 py-2 mb-4 capitalize  self-start border-none font-menseal rounded-[60px]"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
