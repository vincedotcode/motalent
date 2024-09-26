import {ProfileCards}  from "@/components/profile/profile-cards";
import { FileText, Briefcase, Calendar, Settings, Shield, Users } from "lucide-react"; 

export const projects = [
  {
    title: "Resume/CV",
    description: "Create and manage your professional resume/CV to showcase your skills and experience.",
    link: "/profile/resume",
    icon: FileText,
  },
  {
    title: "Applications",
    description: "Track your job applications and see your progress at a glance.",
    link: "/profile/applications",
    icon: Briefcase,
  },
 
  
  {
    title: "Worker's Rights",
    description: "Learn about your rights as a worker and how to protect yourself in the workplace.",
    link: "/profile/rights-act",
    icon: Shield,
  },
  {
    title: "Matches",
    description: "See job matches that align with your skills and career interests.",
    link: "/profile/matches",
    icon: Users,
  },
];

export default function ProfileSection() {
    return (
        <div className="max-w-5xl mx-auto px-8 py-10">
            <ProfileCards items={projects} />
        </div>
    );
}
