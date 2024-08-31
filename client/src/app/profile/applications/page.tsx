
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ApplicationBanner from "@/components/applications/application-banner";
import ApplicationSection from "@/components/applications/application-section";
export default function Application() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ApplicationBanner />
            <ApplicationSection />
            <Footer />
        </div>
    );
}
