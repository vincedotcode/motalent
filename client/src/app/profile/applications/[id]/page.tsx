"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FileIcon, UserIcon, CalendarIcon, BellIcon } from "lucide-react";
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
import { getJobApplicationById } from "@/services/application";
import {
  JobApplication as JobApplicationType,
  StatusHistory,
  Document,
  InterviewEvent,
  Interview,
  Assessment,
} from "@/helper/types";
import InterviewCalendar from "@/components/interview/calendar"; // Import the Calendar component

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
    "Offer Negotiation": "bg-pink-500",
  };

  // Transform interviews for the calendar component
  const interviewEvents: InterviewEvent[] = application.interviews.map((interview: Interview) => {
    const startDateTime = new Date(`${interview.interviewDate}T${interview.interviewTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Assuming 1-hour duration
    return {
      id: interview._id,
      title: application.job.title,
      start: startDateTime,
      end: endDateTime,
      applicantName: `${application.applicant.firstName} ${application.applicant.lastName}`,
      applicationName: application.job.title,
      interviewLocation: interview.interviewLocation,
      isInterviewOnline: interview.isInterviewOnline,
      status: interview.status,
    };
  });

  // Extract assessments from statusHistory
  const assessments: Assessment[] = application.statusHistory
    .filter((history) => history.assessment)
    .map((history) => history.assessment as Assessment);

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
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  {/* <div>
                    <CardTitle>{`${application.applicant.firstName} ${application.applicant.lastName}`}</CardTitle>
                    <CardDescription>{application.applicant.email}</CardDescription>
                  </div> */}
                </div>
                <Badge className={`${statusColors[application.currentStatus]} text-white`}>
                  {application.currentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="status" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="status">Status</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="interviews">Interviews</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                {/* Status Tab */}
                <TabsContent value="status">
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Status History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {application.statusHistory.length > 0 ? (
                        <div className="relative border-l-2 border-gray-300 pl-6">
                          {application.statusHistory.map((history: StatusHistory, index: number) => (
                            <div key={index} className="mb-8">
                              <div
                                className={`absolute w-3 h-3 rounded-full -left-1.5 top-1 ${
                                  statusColors[history.status] || "bg-blue-500"
                                }`}
                              ></div>
                              <div>
                                <p className="text-base font-medium">
                                  {history.status} —{" "}
                                  <span className="text-sm text-gray-500">
                                    {new Date(history.changedAt).toLocaleDateString()}
                                  </span>
                                </p>
                                {history.comments && (
                                  <p className="ml-4 mt-1 text-sm text-gray-700">{history.comments}</p>
                                )}
                                {history.assessment && (
                                  <div className="ml-4 mt-2 space-y-1">
                                    <p className="text-sm font-semibold">
                                      Assessment: {history.assessment.testName}
                                    </p>
                                    <p className="text-sm">Score: {history.assessment.score}</p>
                                    {history.assessment.comments && (
                                      <p className="text-sm text-gray-700">
                                        {history.assessment.comments}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No status history available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Documents Tab */}
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
                              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                                View
                              </a>
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p>No documents available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Assessments Tab */}
                <TabsContent value="assessments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Assessment Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {assessments.length > 0 ? (
                        assessments.map((assessment, index) => (
                          <div key={index} className="mb-4">
                            <div className="flex justify-between items-center">
                              <p className="font-semibold">{assessment.testName}</p>
                              <Badge variant="secondary">{assessment.score}%</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Taken on: {new Date(assessment.takenAt).toLocaleString()}
                            </p>
                            {assessment.comments && (
                              <p className="text-sm text-gray-700 mt-1">{assessment.comments}</p>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>No assessments available.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Interviews Tab */}
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
                              <p className="font-semibold">
                                {new Date(interview.interviewDate).toLocaleDateString()} at {interview.interviewTime}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">
                              Location:{" "}
                              {interview.isInterviewOnline ? "Online" : interview.interviewLocation}
                            </p>
                         
                          </div>
                        ))
                      ) : (
                        <p>No interviews scheduled.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Calendar Tab */}
                <TabsContent value="calendar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Interview Calendar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {interviewEvents.length > 0 ? (
                        <InterviewCalendar interviews={interviewEvents} />
                      ) : (
                        <p>No interviews scheduled.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Notifications Tab */}
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
                                  Sent via {notification.method} on{" "}
                                  {new Date(notification.sentAt).toLocaleString()}
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
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
