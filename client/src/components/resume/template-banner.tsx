import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TemplateBanner() {
  return (
    <section className="w-full h-[50vh] bg-cover bg-center bg-[url('/assets/cv.jpg')] flex items-center justify-center relative">
      <div className="container px-4 md:px-6 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Manage Your CV Here!
        </h1>
        <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg">
          Choose a template and get started
        </p>
       
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
    </section>
  );
}
