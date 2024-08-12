import React, { useState } from "react";

function HeadingSection(): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section className="relative mb-[-7px]">
      {/* CSS Placeholder */}
      {/* Placeholder (Solid Color or Low-Quality Image) */}
      <div
        className={`top-0 bg-white object-cover pointer-events-none transition-opacity duration-500 ease-in-out ${
          isLoaded ? 'hidden' : 'opacity-100'
        }`}
      ></div>

      {/* Main Image */}
      <img
        className={`top-0 mix-blend-screen object-cover pointer-events-none transition-opacity duration-500 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        alt="background image"
        src={require(`@site/static/assets/bg-image2.webp`).default}
        onLoad={handleImageLoad}
      />
      <h1 className="absolute top-1/3 w-full px-1 sm:px-3 left-1/2 md:left-1/2 transform -translate-x-1/2 uppercase text-white font-bold text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-center">
        <div>Events and</div>
        <div>News</div>
      </h1>
    </section>
  );
}

export default HeadingSection;
