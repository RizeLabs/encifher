import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  imageUrl?: string;
  heading: string;
  description: string;
  url: string;
}

const Card: React.FC<CardProps> = ({ imageUrl, heading, description, url }) => {
  const DEFAULT_IMAGE_URL = require(`@site/static/assets/random-image.webp`).default;
  const DESCRIPTION_LIMIT = 55; // Limit for the number of characters in the description

  // Function to truncate description based on characters
  const truncateDescription = (text: string, charLimit: number): string => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };

  return (
    <div className="flex-[1_1_300px] max-w-[400px] h-[520px] border overflow-hidden shadow-md flex flex-col">
      <div className="relative bg-pink-950 flex-shrink-0 w-full h-[300px] max-h-[400px]">
        <img
          src={imageUrl || DEFAULT_IMAGE_URL}
          alt={heading}
          className="w-full h-full object-cover"
        />
        <Link
          to={url}
          className="absolute top-10 right-10 bg-white rounded-full shadow-md w-16 h-16"
        >
          <img
            src={require(`@site/static/assets/top-right-arrow-btn.webp`).default}
            alt="Arrow Button"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
      <div className="p-8 bg-primary-dark flex-grow">
        <h2 className="text-2xl font-semibold mb-2 text-white font-menseal">{heading}</h2>
        <p className="text-lg text-[#E7E7E9B8] font-sora">
          {truncateDescription(description, DESCRIPTION_LIMIT)}
        </p>
      </div>
    </div>
  );
};

export default Card;
