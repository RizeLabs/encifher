import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HeaderSection from "@site/src/components/HomepageFeatures/HeaderSection";
import React from "react";
import EventsSection from "../components/HomepageFeatures/EventsSection";
import CommunitySection from "../components/HomepageFeatures/CommunitySection";
import SocialSection from "../components/HomepageFeatures/SocialSection";

import { Content } from "@theme/BlogPostPage";

interface Props {
  readonly recentPosts: readonly { readonly content: Content }[];
}

export default function Home({ recentPosts }: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      description="Encifher is a compliant programmable privacy engine for DeFi applications."
    >
      {/* <HomepageHeader /> */}
      <main>
        <HeaderSection />
      </main>
    </Layout>
  );
}
