"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobBanner() {

  return (
    <section className="relative flex items-center justify-center h-[50vh] w-full bg-cover bg-center overflow-hidden">
      <Particles
        className="absolute inset-0 z-10"
        quantity={100}
        ease={80}
 
        refresh
      />

      <div className="relative z-20 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Find Your Perfect Job with AI
        </h1>
        <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg max-w-[800px] mx-auto">
          Our AI-powered platform matches you with job opportunities tailored
          specifically to your skills and preferences. Just upload your resume,
          and let the AI do the rest!
        </p>
        <Link href="/jobs">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get Started
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]" />
    </section>
  );
}