import RightSection from "@/components/rights-act/rights-section";
import HeroSection from "@/components/rights-act/hero-section";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function WorkersRight() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <HeroSection />
            <RightSection />
            <Footer />
        </div>
    );
}
