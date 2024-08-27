import React from "react";
import { Link } from "react-router-dom";

import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

interface ViewAllButtonProps {
  className?: string;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ className }) => {
  return (
    <Link
      to="/blog"
      className={`flex gap-[10px] hover:no-underline hover:text-white justify-center items-center hover:cursor-pointer hover:opacity-95 bg-primary-dark py-2 px-4 md:py-3 md:px-8 text-base md:text-xl font-semibold rounded-[60px] border-none text-white transition-colors duration-700 font-menseal self-end bg-custom-gradient  text-[10px] sm:text-base  ${className}`}
    >
      <span>View All</span>
      <img
        className="md:h-3 h-[10px]"
        src={require(`@site/static/assets/footer/top-right-arrow.webp`).default}
        alt="Arrow Icon"
      />
    </Link>
  );
};

const EventsHeading: React.FC = () => {
  return (
    <div className="text-5xl text-white font-bold">
      <div></div>
      <div>BLOGS AND NEWS</div>
    </div>
  );
};

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

export default function EventsSection({ recentPosts }: Props): JSX.Element {
  return (
    <section id="eventsandnews" className="bg-secondary-dark">
      <div className="w-full max-w-[1440px] ml-auto mr-auto lg:px-20 md:px-10 px-5 py-16 md:py-32 flex flex-col items-start gap-24 z-10" >
        <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto">
          <div className="flex justify-between items-center mb-16 w-full">
            <EventsHeading />
            <ViewAllButton className="hidden md:flex" />
          </div>
          <div className="flex flex-wrap gap-8 justify-center mid:justify-start " data-aos="fade-up">
            {recentPosts && recentPosts.slice(0, 3).map(({ content: BlogPostContent }) => (
              <BlogPostProvider
                key={BlogPostContent.metadata.permalink}
                content={BlogPostContent}
              >
                {/* <content.Preview loading='lazy' /> */}
                <BlogPostItem>
                  <BlogPostContent />
                </BlogPostItem>
              </BlogPostProvider>
            ))}
          </div>
          <ViewAllButton className="md:hidden float-right mt-8" />
        </div>
      </div>
    </section>
  );
}
