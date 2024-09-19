
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MatchesBanner from "@/components/matching/jobs-matches-banner"
import JobMatchesSection from "@/components/matching/jobs-matches";
export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <MatchesBanner />
            <JobMatchesSection />
            <Footer />
        </div>
    );
}
