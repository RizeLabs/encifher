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
      description="Encifher is the world\'s first FHE-enabled confidential execution engine over Bitcoin. It allows the creation of encrypted and trustless Apps on the most economically secure blockchain. By leveraging industry-leading TFHE, Encifher achieves blazing-fast composability between multiple private states. Encifher offers on-chain confidential computation using lattice-based cryptography methods, ensuring post-quantum security. More info can be found here: https://bananahq.notion.site/Encifher-public-2bc108ece90a42109369b414748b6b8a?pvs=4"
    >
      {/* <HomepageHeader /> */}
      <main>
        <HeaderSection />
        {/* <EventsSection recentPosts={recentPosts} /> */}
        <CommunitySection />
        <SocialSection />
      </main>
    </Layout>
  );
}
