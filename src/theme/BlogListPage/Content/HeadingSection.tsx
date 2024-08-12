import React from "react";

function HeadingSection(): JSX.Element {
  return (
    <section className="relative mb-[-7px]">
      <img
        className="mix-blend-screen top-0 pointer-events-none"
        alt="background image"
        src={require(`@site/static/assets/bg-image2.webp`).default}
      />
      <h1 className="absolute top-1/3 w-full px-1 sm:px-3 left-1/2 md:left-1/2 transform -translate-x-1/2 uppercase text-white font-bold text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-center">
        <div>Events and</div>
        <div>News</div>
      </h1>
    </section>
  );
}

export default HeadingSection;
