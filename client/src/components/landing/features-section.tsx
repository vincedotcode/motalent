import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import TypingAnimation from "@/components/magicui/typing-animation";
import { User, BriefcaseBusiness, MessageCircle } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";

const features = [
    {
        Icon: BriefcaseBusiness,
        name: "Job Matching",
        description: "Our AI-driven job matching algorithm finds the best job opportunities for you.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3 text-black dark:text-white",
    },
    {
        Icon: User,
        name: "Profile Optimization",
        description: "Optimize your profile to attract more recruiters and increase your chances of getting hired.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 text-black dark:text-white",
    },
    {
        Icon: MessageCircle,
        name: "AI Chat Assistance",
        description: "Get instant help and guidance with our AI-powered chat assistance.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>,
        className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4 text-black dark:text-white",
    },
    {
        Icon: CalendarIcon,
        name: "Interview Scheduler",
        description: "Schedule and manage your interviews seamlessly with our integrated scheduler.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2 text-black dark:text-white",
    },
    {
        Icon: BellIcon,
        name: "Real-Time Notifications",
        description: "Stay updated with real-time notifications for job matches, messages, and more.",
        href: "/",
        cta: "Learn more",
        background: <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>,
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 text-black dark:text-white",
    },
];

export async function FeaturesSection() {
    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <TypingAnimation
                        className="text-4xl font-bold text-black dark:text-white"
                        text="MoTalent Upcoming Features"
                    />

                </div>
                <BentoGrid className="lg:grid-rows-3">
                    {features.map((feature) => (
                        <BentoCard key={feature.name} {...feature} />
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
