import React from "react";
import { Link } from "react-router-dom";

import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

const EventsHeading: React.FC = () => {
  return (
    <div className="text-5xl text-primary-dark font-bold uppercase">
      <div>EVENTS</div>
    </div>
  );
};

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

export default function AllEventsSection({ recentPosts }: Props): JSX.Element {
  return (
    <section>
      <div className="w-screen lg:px-20 md:px-10 px-5 py-16 md:py-32 flex flex-col items-start bg-footer-bg gap-24 z-10">
        <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto">
          <div className="flex justify-between items-center mb-16 w-full">
            <EventsHeading />
          </div>
          <div className="flex flex-wrap gap-8" data-aos="fade-up">
            {recentPosts.map(({ content: BlogPostContent }) => {
              const { metadata } = BlogPostContent;

              // Check if the topic is "news" and skip rendering if it is
              if (metadata?.frontMatter?.topic !== "events") return null;
              return (
                <BlogPostProvider
                  key={BlogPostContent.metadata.permalink}
                  content={BlogPostContent}
                >
                  {/* <content.Preview loading='lazy' /> */}
                  <BlogPostItem>
                    <BlogPostContent />
                  </BlogPostItem>
                </BlogPostProvider>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
