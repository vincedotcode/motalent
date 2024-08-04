import PrivacyPolicy from "@/components/privacy/privacy-card";
import HeroSection from "@/components/privacy/hero-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroSection />
            <PrivacyPolicy />
            <Footer />
        </div>
    );
}
