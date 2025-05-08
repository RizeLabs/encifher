import Hero from "../Hero/Hero";
// import Exposed from "../Exposed/Exposed";
import Choose from "../Choose/Choose";
import Suite from "../Suite/Suite";
import Faq from "../Faq/Faq";
import Footer from "../Footer/Footer";

export default function Home() {
    return (
        <>
            <Hero />
            {/* <Exposed /> */}
            <Choose />
            <Suite />
            <Faq />
            <Footer />
        </>
    )
}