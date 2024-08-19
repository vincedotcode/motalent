import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BriefcaseIcon, GraduationCapIcon, PuzzleIcon, FlagIcon, HourglassIcon, Globe } from "lucide-react"; 

interface ResumeCardProps {
    resume: {
        personalInfo: {
            firstName: string;
            lastName: string;
            dateOfBirth: string;
            email: string;
            phoneNumber: string;
            addressLine1: string;
            addressLine2?: string;
            country: string;
        };
        education: {
            institution: string;
            degree: string;
            fieldOfStudy: string;
            startDate: string;
            endDate: string;
            grade: string;
        }[];
        experience: {
            jobTitle: string;
            companyName: string;
            startDate: string;
            endDate: string;
            responsibilities: string;
        }[];
        skills: string[];
        languages: string[];
        hobbies: string[];
        completionPercentage: number;
    };
}

const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
    const {
        personalInfo,
        education,
        experience,
        skills,
        languages,
        hobbies,
        completionPercentage,
    } = resume;

    return (
        <Card className="w-full max-w-xl p-8 grid gap-8">
            <div className="flex items-center justify-between">
                <div className="grid gap-2">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarFallback>{personalInfo.firstName[0]}{personalInfo.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <h2 className="text-2xl font-bold">{personalInfo.firstName} {personalInfo.lastName}</h2>
                            <p className="text-muted-foreground">Software Engineer</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FlagIcon className="w-4 h-4" />
                        <span>{personalInfo.addressLine1}, {personalInfo.country}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm font-medium">
                        <PuzzleIcon className="w-4 h-4" />
                        <span>{completionPercentage}%</span>
                    </div>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="grid gap-6">
                    <div className="grid gap-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <GraduationCapIcon className="w-5 h-5" />
                            Education
                        </h3>
                        <div className="grid gap-2">
                            {education.length > 0 && (
                                <div>
                                    <p className="font-medium">{education[0].degree} in {education[0].fieldOfStudy}</p>
                                    <p className="text-muted-foreground text-sm">{education[0].institution} | {new Date(education[0].startDate).getFullYear()} - {new Date(education[0].endDate).getFullYear()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BriefcaseIcon className="w-5 h-5" />
                            Experience
                        </h3>
                        <div className="grid gap-4">
                            {experience.length > 0 && (
                                <div>
                                    <p className="font-medium">{experience[0].jobTitle}</p>
                                    <p className="text-muted-foreground text-sm">{experience[0].companyName} | {new Date(experience[0].startDate).getFullYear()} - {new Date(experience[0].endDate).getFullYear()}</p>
                                    <p className="text-sm">{experience[0].responsibilities}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <PuzzleIcon className="w-5 h-5" />
                            Skills
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {skills.map((skill, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <PuzzleIcon className="w-5 h-5" />
                                    <span>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Globe className="w-5 h-5" />
                            Languages
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {languages.map((language, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <FlagIcon className="w-5 h-5" />
                                    <span>{language}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <HourglassIcon className="w-5 h-5" />
                            Hobbies
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {hobbies.map((hobby, index) => (
                                <div className="flex items-center gap-2" key={index}>
                                    <PuzzleIcon className="w-5 h-5" />
                                    <span>{hobby}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ResumeCard;
