import { BriefcaseBusiness, ChevronRight } from 'lucide-react';
import Link from "next/link";
import { FeatureSuggestionDialog } from '@/components/landing/FeatureSuggestionDialog'; // Import the dialog component
import { Button } from '@/components/ui/button';
export default function HeroSectionGradientBackground() {
    return (
        <>
            {/* Hero */}
            <div className="relative overflow-hidden py-24 lg:py-32 ">
                {/* Gradients */}
                <div
                    aria-hidden="true"
                    className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
                >
                    <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
                    <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] from-primary-foreground via-primary-foreground to-background" />
                </div>
                {/* End Gradients */}
                <div className="relative z-10">
                    <div className="container py-10 lg:py-16">
                        <div className="max-w-2xl text-center mx-auto">
                            <p className="">Presenting</p>
                            {/* Title */}
                            <div className="mt-5 max-w-2xl flex items-center justify-center">
                                <BriefcaseBusiness className="mr-2" color="#3576DF" size={48} />
                                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    MoTalent
                                </h1>
                            </div>
                            {/* End Title */}
                            <div className="mt-5 max-w-3xl">
                                <p className="text-xl text-muted-foreground">
                                    A powerful platform, that helps you to find the best talents for your company, and also helps you to find the best job for you.
                                </p>
                            </div>
                            {/* Buttons */}
                            <div className="mt-8 gap-3 flex justify-center">
                                <Link href="/auth/signup">
                                    <Button size={"lg"}>
                                        Get Started
                                    </Button>
                                </Link>
                                <FeatureSuggestionDialog /> 
                            </div>
                            <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
                                <span className="text-sm text-muted-foreground">
                                    Creator:
                                </span>
                                <span className="text-sm font-bold">Vince Erkadoo </span>
                                <svg
                                    className="h-5 w-5 text-muted-foreground"
                                    width={16}
                                    height={16}
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M6 13L10 3"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <a
                                    className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
                                    target="_blank"
                                    href="https://www.linkedin.com/in/vinceerkadoo/"
                                >
                                    vincedotcode
                                    <ChevronRight className="flex-shrink-0 w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Hero */}
        </>
    );
}
