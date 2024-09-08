'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/helper/darkmode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, UserIcon, CalendarIcon, BellIcon, ChevronRightIcon } from "lucide-react";
import { getJobApplicationById } from '@/services/application';
import { JobApplication as JobApplicationType, StatusHistory, Document } from '@/helper/types'; // Adjust the path as necessary

export default function JobApplication() {
    const { id } = useParams(); // Get the application ID from the URL params

    const [application, setApplication] = useState<JobApplicationType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                if (id) {
                    const data = await getJobApplicationById(id as string);
                    console.log("Fetched application data:", data); 
                    setApplication(data);
                }
            } catch (error) {
                console.error("Error fetching application:", error); 
                setError("An error occurred while fetching the application data.");
            }
        };
    
        fetchApplication();
    }, [id]);
    
    if (!application) {
        return <div>Loading...</div>;
    }

    const statusColors: Record<string, string> = {
        "Submitted": "bg-blue-500",
        "Under Review": "bg-yellow-500",
        "Interview Scheduled": "bg-purple-500",
        "Offer Extended": "bg-green-500",
        "Rejected": "bg-red-500",
        "Withdrawn": "bg-gray-500",
        "Background Check": "bg-indigo-500",
        "Offer Negotiation": "bg-pink-500"
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-8">
                    <Link href="/profile/applications">
                        <Button variant="default">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Applications
                        </Button>
                    </Link>
                    <ModeToggle />
                </div>

                <div className="container mx-auto p-4">
                    {error && <p className="text-red-500">{error}</p>}
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarFallback><UserIcon className="h-5 w-5" /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{`${application.applicant.firstName} ${application.applicant.lastName}`}</CardTitle>
                                        <CardDescription>{application.applicant.email}</CardDescription>
                                    </div>
                                </div>
                                <Badge className={`${statusColors[application.currentStatus]} text-white`}>
                                    {application.currentStatus}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="status" className="w-full">
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="status">Status</TabsTrigger>
                                    <TabsTrigger value="documents">Documents</TabsTrigger>
                                    <TabsTrigger value="assessments">Assessments</TabsTrigger>
                                    <TabsTrigger value="interviews">Interviews</TabsTrigger>
                                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                </TabsList>
                                <TabsContent value="status">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Application Status History</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-[200px]">
                                                {application.statusHistory.length > 0 ? (
                                                    application.statusHistory.map((status: StatusHistory, index: number) => (
                                                        <div key={index} className="flex justify-between items-center mb-4">
                                                            <div>
                                                                <p className="font-semibold">{status.status}</p>
                                                                <p className="text-sm text-gray-500">Changed by: {status.changedBy}</p>
                                                            </div>
                                                            <p className="text-sm text-gray-500">{new Date(status.changedAt).toLocaleString()}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No status history available.</p>
                                                )}
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="documents">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Application Documents</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {application.additionalDocuments.length > 0 ? (
                                                application.additionalDocuments.map((doc: Document, index: number) => (
                                                    <div key={index} className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center">
                                                            <FileIcon className="h-5 w-5 mr-2" />
                                                            <p>{doc.name}</p>
                                                        </div>
                                                        <Button variant="outline" size="sm" asChild>
                                                            <a href={doc.url} target="_blank" rel="noopener noreferrer">View</a>
                                                        </Button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No documents available.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="assessments">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Assessment Results</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {application.assessments.length > 0 ? (
                                                application.assessments.map((assessment, index) => (
                                                    <div key={index} className="mb-4">
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-semibold">{assessment.testName}</p>
                                                            <Badge variant="secondary">{assessment.score}%</Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-500">Taken on: {new Date(assessment.takenAt).toLocaleString()}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No assessments available.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="interviews">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Scheduled Interviews</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {application.interviews.length > 0 ? (
                                                application.interviews.map((interview, index) => (
                                                    <div key={index} className="mb-4">
                                                        <div className="flex items-center mb-2">
                                                            <CalendarIcon className="h-5 w-5 mr-2" />
                                                            <p className="font-semibold">{new Date(interview.interviewDate).toLocaleDateString()} at {interview.interviewTime}</p>
                                                        </div>
                                                        <p className="text-sm text-gray-500 mb-1">Location: {interview.interviewLocation}</p>
                                                        <p className="text-sm text-gray-500">Interviewers: {interview.interviewers.join(", ")}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No interviews scheduled.</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="notifications">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Notifications</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-[200px]">
                                                {application.notifications.length > 0 ? (
                                                    application.notifications.map((notification, index) => (
                                                        <div key={index} className="flex items-start mb-4">
                                                            <BellIcon className="h-5 w-5 mr-2 mt-1" />
                                                            <div>
                                                                <p>{notification.message}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Sent via {notification.method} on {new Date(notification.sentAt).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No notifications available.</p>
                                                )}
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    <div className="mt-4 flex justify-end">
                        <Button>
                            Update Application Status
                            <ChevronRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

