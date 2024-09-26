"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CountWidget from "@/components/admin-panel/dashboard/count-widget";
import { getAllUsers } from "@/services/user";
import { getAllCompanies } from "@/services/company";
import { getAllJobs } from "@/services/job";
import { getAllInterviews } from "@/services/Interview"; // Import the getAllInterviews function
import {
  UserPlus,
  BriefcaseBusiness,
  Briefcase,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "@/components/loader";
import Calendar from "@/components/interview/calendar";
import { Interview, InterviewEvent } from "@/helper/types"; // Import types

export default function DashboardPage() {
  const [userCount, setUserCount] = useState<number>(0);
  const [companyCount, setCompanyCount] = useState<number>(0);
  const [jobCount, setJobCount] = useState<number>(0);
  const [interviews, setInterviews] = useState<InterviewEvent[]>([]); // Update state type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        const companies = await getAllCompanies();
        const jobs = await getAllJobs();
        const interviewsData = await getAllInterviews(); // Fetch all interviews

        setUserCount(users.length);
        setCompanyCount(companies.length);
        setJobCount(jobs.length);

        // Transform interviewsData to match InterviewEvent type
        const transformedInterviews = interviewsData.map((interview: Interview) => {
          const startDateTime = new Date(
            `${interview.interviewDate}T${interview.interviewTime}`
          );
          const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Assuming 1-hour duration
        
          return {
            id: interview._id,
            title: interview.applicationName,
            start: startDateTime,
            end: endDateTime,
            applicantId:
              typeof interview.applicantId === 'string'
                ? interview.applicantId
                : interview.applicantId, // Keep the object if it's not a string
            applicationName: interview.applicationName,
            interviewLocation: interview.interviewLocation,
            isInterviewOnline: interview.isInterviewOnline,
            status: interview.status,
          };
        });
        

        setInterviews(transformedInterviews);
      } catch (err) {
        console.log(err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CardContent className="p-3">
        <CardHeader>
          <CardTitle>Widgets</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CountWidget
            amount={userCount}
            percentage="Users"
            icon={<UserPlus className="h-6 w-6 text-primary-foreground" />}
          />
          <CountWidget
            amount={companyCount}
            percentage="Companies"
            icon={
              <BriefcaseBusiness className="h-6 w-6 text-primary-foreground" />
            }
          />
          <CountWidget
            amount={jobCount}
            percentage="Vacancies"
            icon={<Briefcase className="h-6 w-6 text-primary-foreground" />}
          />
        </div>
      </CardContent>

      <CardContent className="p-3">
        <CardHeader>
          <CardTitle>Interview Calendar</CardTitle>
        </CardHeader>
        {interviews.length > 0 ? (
          <Calendar interviews={interviews} /> // Pass the interviews to the Calendar component
        ) : (
          <p>No interviews scheduled.</p>
        )}
      </CardContent>
    </ContentLayout>
  );
}
