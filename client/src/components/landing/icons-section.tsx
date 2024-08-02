"use client";

import { BriefcaseBusiness, ThumbsUpIcon, Users2Icon, UserCheckIcon } from "lucide-react";
import { VelocityScroll  } from "@/components/magicui/scroll-based-velocity";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

export default function IconSectionCentredDescriptionWithIconBlocks() {
  return (
    <>
      {/* Icon Blocks */}
      <div className="relative pb-12 overflow-hidden">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
          )}
        />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Title */}
            <ScrollBasedVelocityDemo />
            {/* Grid */}
            <div className="grid gap-12 mt-12">
              <div>
                <h2 className="text-3xl font-bold lg:text-4xl">Our vision</h2>
                <p className="mt-3 text-muted-foreground">
                  MoTalent aims to revolutionize the job market by creating an innovative platform that connects job seekers with top employers, fostering professional growth and career development.
                </p>
              </div>
              <div className="space-y-6 lg:space-y-10">
                {/* Icon Block */}
                <div className="flex">
                  <BriefcaseBusiness className="flex-shrink-0 mt-2 h-6 w-6" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Diverse Job Opportunities
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Explore a wide range of job listings from various industries, ensuring you find the perfect match for your skills and interests.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <Users2Icon className="flex-shrink-0 mt-2 h-6 w-6" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Community Engagement
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Join a vibrant community of professionals, network with peers, and participate in events to enhance your career growth.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <ThumbsUpIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Simplified Application Process
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Our platform streamlines the job application process, allowing you to apply with ease and track your application status in real-time.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
                {/* Icon Block */}
                <div className="flex">
                  <UserCheckIcon className="flex-shrink-0 mt-2 h-6 w-6" />
                  <div className="ms-5 sm:ms-8">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Verified Employers
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      Connect with verified employers to ensure a safe and trustworthy job search experience, giving you peace of mind.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}
              </div>
            </div>
            {/* End Grid */}
          </div>
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
}


export function ScrollBasedVelocityDemo() {
    return (
      <VelocityScroll
        text="Perks of MoTalent"
        default_velocity={5}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      />
    );
  }