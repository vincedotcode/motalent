
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProfileBanner from "@/components/profile/profile-banner";
import ProfileSection from "@/components/profile/profile-section";

export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ProfileBanner />
            <ProfileSection />
            <Footer />
        </div>
    );
}
