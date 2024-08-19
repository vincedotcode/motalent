
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TemplateBanner from "@/components/resume/template-banner";
import TemplateSection from "@/components/resume/template-section";
export default function Privacy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <TemplateBanner />
            <TemplateSection />
            <Footer />
        </div>
    );
}
