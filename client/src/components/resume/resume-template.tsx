'use client';

import Link from "next/link";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Resume, deleteResume } from "@/services/resume";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { LoadingButton } from "@/components/ui/loading-button";
import { Badge } from "@/components/ui/badge";

interface ResumeTemplateProps {
    resume: Resume;
}

export default function ResumeTemplate({ resume }: ResumeTemplateProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!resume) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-lg text-gray-500 dark:text-gray-400">Loading resume...</p>
            </div>
        );
    }

    const {
        personalInfo,
        education,
        experience,
        skills,
        languages,
        hobbies,
        customSections,
        websites,
        resumeName
    } = resume;

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteResume(resume._id);
            toast({
                title: "Success!",
                description: "Resume deleted successfully!",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error!",
                description: "Failed to delete the resume.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };


    const handlePrint = () => {
        window.print();
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: resumeName,
                text: `Check out my resume: ${resumeName}`,
                url: window.location.href,
            })
                .then(() => {
                    toast({
                        title: "Success!",
                        description: "Resume shared successfully!",
                        variant: "default",
                    });
                })
                .catch((error) => {
                    toast({
                        title: "Error!",
                        description: "Failed to share the resume.",
                        variant: "destructive",
                    });
                });
        } else {
            toast({
                title: "Error!",
                description: "Your browser does not support the share feature.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 py-10">
        
            {/* Breadcrumb Navigation */}
            <div className="container mx-auto px-4 mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>
                                <Link href="/profile/resume">Templates</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{resumeName}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Resume Content */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-end gap-4 mb-8 no-print">
                    <div className="flex space-x-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your resume.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <LoadingButton onClick={handleDelete} loading={isDeleting} variant="destructive">
                                            {isDeleting ? "Deleting..." : "Delete"}
                                        </LoadingButton>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button
                            onClick={handleShare}
                            variant="outline"
                        >
                            Share
                        </Button>
                        <Button
                            onClick={handlePrint}
                            variant="default"
                        >
                            Print
                        </Button>
                    </div>
                </div>

                {/* Paper-Like Resume Container */}
                <div className="flex justify-center items-center print-container">
                    <div
                        id="resume-container"
                        className="bg-white dark:bg-gray-800 text-foreground dark:text-white font-inter shadow-lg print-area"
                        style={{
                            width: '8.27in', // A4 width
                            padding: '1in', // 1 inch padding to resemble margins
                            boxSizing: 'border-box',
                            overflow: 'hidden'
                        }}
                    >
                        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold dark:text-white">{personalInfo.firstName} {personalInfo.lastName}</h1>
                                <div className="text-gray-700 dark:text-gray-300 text-lg">
                                    <p>{personalInfo.email}</p>
                                    <p>{personalInfo.phoneNumber}</p>
                                    <p>{personalInfo.addressLine1}{personalInfo.addressLine2 ? `, ${personalInfo.addressLine2}` : ''}, {personalInfo.country}</p>
                                </div>
                            </div>
                        </header>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <div className="space-y-2">
                                <p className="text-lg font-medium dark:text-white">Professional Summary</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {personalInfo.description}
                                </p>
                            </div>
                        </section>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Education</h2>
                            <div className="space-y-4">
                                {education.map((edu, idx) => (
                                    <div key={idx}>
                                        <p className="font-medium dark:text-white">{edu.degree} in {edu.fieldOfStudy}</p>
                                        <p className="text-gray-700 dark:text-gray-300">{edu.institution} - {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-lg font-medium dark:text-white">{exp.jobTitle}</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{exp.companyName} - {new Date(exp.startDate).getFullYear()} - {new Date(exp.endDate).getFullYear()}</p>
                                        <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                                            <li>{exp.responsibilities}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Skills</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="font-medium dark:text-white">Technical Skills</p>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {skills.map((skill, idx) => (
                                            <Badge key={idx} className="dark:bg-gray-700 dark:text-white">{skill}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Languages</h2>
                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                {languages.map((language, idx) => (
                                    <div key={idx}>
                                        <p className="font-medium dark:text-white">{language}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Hobbies</h2>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                {hobbies.map((hobby, idx) => (
                                    <li key={idx}>{hobby}</li>
                                ))}
                            </ul>
                        </section>

                        {customSections.map((section, idx) => (
                            <div key={idx}>
                                <Separator className="my-4 dark:bg-gray-600" />
                                <section>
                                    <h2 className="text-2xl font-bold mb-4 dark:text-white">{section.title}</h2>
                                    <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                                </section>
                            </div>
                        ))}

                        <Separator className="my-4 dark:bg-gray-600" />

                        <section>
                            <h2 className="text-2xl font-bold mb-4 dark:text-white">Websites</h2>
                            <div className="space-y-2 text-gray-700 dark:text-gray-300">
                                {websites.map((website, idx) => (
                                    <div key={idx}>
                                        <p className="font-medium dark:text-white">{website.name}</p>
                                        <p>
                                            <Link href={website.url} className="underline" prefetch={false}>
                                                {website.url}
                                            </Link>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-container, .print-container * {
                        visibility: visible;
                    }
                    .print-container {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                    }
                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
}

