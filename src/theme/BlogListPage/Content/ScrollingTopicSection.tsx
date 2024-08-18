import React from "react";
import { Link } from "react-router-dom";

import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";

const Heading: React.FC<{ heading: string }> = ({
  heading,
}: {
  heading: string;
}) => {
  return (
    <div className="text-5xl text-white font-bold uppercase">
      <div>{heading}</div>
    </div>
  );
};

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
  heading: string;
  topic: "news" | "events";
}

export default function ScrollingTopicSection({
  recentPosts,
  heading,
  topic,
}: Props): JSX.Element {
  return (
    <section className="bg-secondary-dark">
      <div className="w-full max-w-[1440px] ml-auto mr-auto lg:px-20 md:px-10 px-5 py-16 md:py-32 flex flex-col items-start  gap-24 z-10">
        <div className="max-w-[400px] md:w-full md:max-w-none mr-auto ml-auto">
          <div className="flex justify-start items-center mb-16 w-full">
            <Heading heading={heading} />
          </div>
          <div className="flex overflow-x-scroll gap-8 md:-mr-10 lg:-mr-20">
            {recentPosts.map(({ content: BlogPostContent }) => {
              const { metadata } = BlogPostContent;

              // Check if the topic is "news" and skip rendering if it is
              if (metadata?.frontMatter?.topic !== topic) return null;
              return (
                <BlogPostProvider
                  key={BlogPostContent.metadata.permalink}
                  content={BlogPostContent}
                >
                  {/* <content.Preview loading='lazy' /> */}
                  <div className="min-w-[320px] md:flex-shrink-0">
                    <BlogPostItem>
                      <BlogPostContent />
                    </BlogPostItem>
                  </div>
                </BlogPostProvider>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
