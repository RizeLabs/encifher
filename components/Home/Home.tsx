import Hero from "../Hero/Hero";
// import Exposed from "../Exposed/Exposed";
import Choose from "../Choose/Choose";
// import Suite from "../Suite/Suite";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";
import Waitlist from "../Waitlist/Waitlist";
import Testimonial from "../Testimonial/Testimonial";

export default function Home() {
    return (
        <div className="bg-[#0c0c0c]">
            <Hero />
            {/* <Exposed /> */}
            {/* <Choose /> */}
            {/* <Suite /> */}
            <Faq />
            <Testimonial />
            <Waitlist />
            <Footer />
        </div>
    )
}