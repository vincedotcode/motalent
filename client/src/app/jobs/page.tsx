
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import JobListing from "@/components/jobs/jobs-listing";
export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <JobListing />
            <Footer />
        </div>
    );
}
