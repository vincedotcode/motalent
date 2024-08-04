import PrivacyPolicy from "@/components/privacy/PrivacyCard";
import HeroSection from "@/components/privacy/HeroSection";
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
