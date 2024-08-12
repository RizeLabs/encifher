import React from "react";
import clsx from "clsx";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import BlogPostItemContainer from "@theme/BlogPostItem/Container";
import BlogPostItemHeader from "@theme/BlogPostItem/Header";
import BlogPostItemContent from "@theme/BlogPostItem/Content";
import BlogPostItemFooter from "@theme/BlogPostItem/Footer";
import BlogCard from "@site/src/components/common/BlogCard";
import type { Props } from "@theme/BlogPostItem";

// apply a bottom margin in list view
function useContainerClassName() {
  const { isBlogPostPage } = useBlogPost();
  return !isBlogPostPage ? "margin-bottom--xl" : undefined;
}

// Import default image statically
const DEFAULT_IMAGE_URL =
  require("@site/static/assets/random-image.webp").default;

export default function BlogPostItem({
  children,
  className,
}: Props): JSX.Element {
  const { isBlogPostPage, metadata } = useBlogPost();
  const containerClassName = useContainerClassName();

  if (!isBlogPostPage) {
    return (
      <BlogCard
        heading={metadata.title}
        description={metadata.description}
        url={metadata.permalink}
        imageUrl={metadata.frontMatter.image || DEFAULT_IMAGE_URL}
      />
    );
  }

  return (
    <BlogPostItemContainer className={clsx(containerClassName, className)}>
      <BlogPostItemHeader />
      <BlogPostItemContent>{children}</BlogPostItemContent>
      <BlogPostItemFooter />
    </BlogPostItemContainer>
  );
}
