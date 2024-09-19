import Hero from "@/components/landing/hero";
import Navbar from "@/components/navbar";
import IconSection from "@/components/landing/icons-section";
import { IssuesSection } from "@/components/landing/issues-section"
import { FeaturesSection } from "@/components/landing/features-section";
import JobMatchingSection from "@/components/matching/jobs-matching-section";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <IconSection />
      <JobMatchingSection />
      <IssuesSection />
      <FeaturesSection />
      <Footer />
    </>

  );
}
