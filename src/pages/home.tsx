import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import HeaderSection from "@site/src/components/HomepageFeatures/HeaderSection";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import React from "react";
import EventsSection from "../components/HomepageFeatures/EventsSection";
import CommunitySection from "../components/HomepageFeatures/CommunitySection";
import SocialSection from "../components/HomepageFeatures/SocialSection";

import BlogPostItem from "@theme/BlogPostItem";
import { Content } from "@theme/BlogPostPage";
import { BlogPostProvider } from "@docusaurus/theme-common/internal";
import PaginatorNavLink from "@theme/PaginatorNavLink";

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

export default function Home({ recentPosts }: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      {/* <HomepageHeader /> */}
      <main>
        <HeaderSection />
        <EventsSection recentPosts={recentPosts} />
        <CommunitySection />
        <SocialSection />
      </main>
    </Layout>
  );
}
