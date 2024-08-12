import React from "react";
import SocialCard from "../common/SocialCard";

export default function SocialSection(): JSX.Element {
  return (
    <div className="w-screen lg:px-20 md:px-10 px-5 pb-16 md:pb-24 flex flex-col items-start bg-secondary-dark gap-24 z-10" data-aos="fade-up">
      <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto flex flex-wrap gap-6 justify-center">
        <SocialCard
            socialIconUrl={require(`@site/static/assets/social/twitterIcon.webp`).default}
            linkUrl="https://x.com/encifherio"
            text="Twitter"
            hoverColor="#03A9F4"
        />
        <SocialCard
            socialIconUrl={require(`@site/static/assets/social/telegramIcon.webp`).default}
            linkUrl="https://t.me/BananaHQ"
            text="Telegram"
            hoverColor="#28A8EA"
        />
        <SocialCard
            socialIconUrl={require(`@site/static/assets/social/discordIcon.webp`).default}
            linkUrl="https://x.com/encifherio"
            text="Discord"
            hoverColor="#5765EC"
        />
        <SocialCard
            socialIconUrl={require(`@site/static/assets/social/githubIcon.webp`).default}
            linkUrl="https://github.com/RizeLabs"
            text="GitHub"
            hoverColor="#000000"
        />
      </div>
    </div>
  );
}
