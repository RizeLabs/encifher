"use client"
import { useState } from "react";
import Hero from "../Hero/Hero";
import Navbar from "../Navbar/Navbar";
import MobileMenu from "../Navbar/MobileMenu";
// import Exposed from "../Exposed/Exposed";
// import Choose from "../Choose/Choose";
// import Suite from "../Suite/Suite";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";
import Waitlist from "../Waitlist/Waitlist";
import Testimonial from "../Testimonial/Testimonial";
import { Video } from "../Video/Video";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuClick = () => setIsMenuOpen((open) => !open);
    const handleCloseMenu = () => setIsMenuOpen(false);
    return (
        <div className="bg-[#0c0c0c] w-fit">
            <Hero>
                <Navbar isMenuOpen={isMenuOpen} onMenuClick={handleMenuClick} />
                <MobileMenu
                    isOpen={isMenuOpen}
                    onClose={handleCloseMenu}
                    onBlogsClick={() => { window.open("/blogs", "_blank"); handleCloseMenu(); }}
                    onDocsClick={() => { window.open("https://docs.encifher.io/docs/intro/", "_blank"); handleCloseMenu(); }}
                    onLaunchAppClick={() => { window.open("https://app.encifher.io", "_blank"); handleCloseMenu(); }}
                />
            </Hero>
            <Video/>
            {/* <Exposed /> */}
            {/* <Choose /> */}
            {/* <Suite /> */}
            <Testimonial />
            <Faq />
            <Waitlist />
            <Footer />
        </div>
    )
}