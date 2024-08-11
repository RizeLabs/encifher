import React from "react";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import BlogPostItems from "@theme/BlogPostItems";
import HeadingSection from "./HeadingSection";
import AllEventsSection from "./AllEventsSection";
import type {Props} from '@theme/BlogListPage';
import ScrollingTopicSection from "./ScrollingTopicSection";

function BlogPageContentHeaderSection(props: Props): JSX.Element {
  return (
    <main data-aos="fade-up">
      <HeadingSection />
      <AllEventsSection recentPosts={props.items}/>
      <ScrollingTopicSection recentPosts={props.items} heading="news" topic="news" />
    </main>
  );
}

export default BlogPageContentHeaderSection;
