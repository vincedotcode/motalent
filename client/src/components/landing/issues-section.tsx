"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import TypingAnimation from "@/components/magicui/typing-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const issues = [
  {
    title: "Long Job Search Process",
    description: "MoTalent streamlines the job search process, reducing the time it takes to find relevant job listings.",
    icon: "https://avatar.vercel.sh/issue1",
  },
  {
    title: "Difficulty Connecting with Employers",
    description: "MoTalent provides a platform where job seekers can easily connect with top employers in their industry.",
    icon: "https://avatar.vercel.sh/issue2",
  },
  {
    title: "Unclear Application Status",
    description: "MoTalent offers real-time application tracking, so you always know the status of your job applications.",
    icon: "https://avatar.vercel.sh/issue3",
  },
  {
    title: "Lack of Networking Opportunities",
    description: "MoTalent fosters a vibrant community of professionals, providing ample networking opportunities.",
    icon: "https://avatar.vercel.sh/issue4",
  },
  {
    title: "Complex Recruitment Process",
    description: "MoTalent simplifies the recruitment process for employers, making it easier to find and hire the right candidates.",
    icon: "https://avatar.vercel.sh/issue5",
  },
  {
    title: "Unverified Employers",
    description: "MoTalent ensures that all employers on the platform are verified, providing a safe and trustworthy job search experience.",
    icon: "https://avatar.vercel.sh/issue6",
  },
];

const firstRow = issues.slice(0, issues.length / 2);
const secondRow = issues.slice(issues.length / 2);

const IssueCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {title}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{description}</blockquote>
    </figure>
  );
};

export function IssuesSection() {
  return (
    <div className="relative flex flex-col items-center justify-center py-24 lg:py-32 overflow-hidden bg-background">
        <div className="my-3">
        <TypingAnimation
      className="text-4xl font-bold text-black dark:text-white"
      text="MoTalent Solves Your Job-Related Issues"
    />
        </div>
      <div className="relative flex h-[500px] w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((issue) => (
            <IssueCard key={issue.title} {...issue} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((issue) => (
            <IssueCard key={issue.title} {...issue} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}
