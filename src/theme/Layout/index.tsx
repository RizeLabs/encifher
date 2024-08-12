import React, { useEffect, useState } from "react";
import clsx from "clsx";
import ErrorBoundary from "@docusaurus/ErrorBoundary";
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import { useKeyboardNavigation } from "@docusaurus/theme-common/internal";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import LayoutProvider from "@theme/Layout/Provider";
import { Sidebar } from "./Sidebar";
import ErrorPageContent from "@theme/ErrorPageContent";
import type { Props } from "@theme/Layout";
import styles from "./styles.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Layout(props: Props): JSX.Element {
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    });
  }, []);

  const {
    children,
    noFooter,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useKeyboardNavigation();

  return (
    <div data-aos-duration="1200" data-aos-delay="0">
      <LayoutProvider>
        <PageMetadata title={title} description={description} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar onMenuClick={toggleSidebar} />

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          id={SkipToContentFallbackId}
          className={clsx(
            ThemeClassNames.wrapper.main,
            styles.mainWrapper,
            wrapperClassName
          )}
        >
          <ErrorBoundary
            fallback={(params) => <ErrorPageContent {...params} />}
          >
            {children}
          </ErrorBoundary>
        </div>

        {!noFooter && <Footer />}
      </LayoutProvider>
    </div>
  );
}
