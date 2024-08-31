"use client"

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import JobApplicationCard from "@/components/applications/application-card"; // Ensure that this path is correct
import { getJobApplicationsByUserId } from "@/services/application"; // Ensure that this path is correct
import { JobApplication } from "@/helper/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ManageApplicationsSection() {
    const [applications, setApplications] = useState<JobApplication[]>([]);
    const [sortBy, setSortBy] = useState<string>("date");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6;

    useEffect(() => {
        async function fetchApplications() {
            try {
                const fetchedApplications = await getJobApplicationsByUserId();
                setApplications(fetchedApplications);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        }

        fetchApplications();
    }, []);

    const sortApplications = (applications: JobApplication[], sortBy: string) => {
        switch (sortBy) {
            case "date":
                return applications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            case "status":
                return applications.sort((a, b) => a.currentStatus.localeCompare(b.currentStatus));
            case "jobTitle":
                return applications.sort((a, b) => a.job.title.localeCompare(b.job.title));
            default:
                return applications;
        }
    };

    const getCurrentPageData = (applications: JobApplication[], currentPage: number, itemsPerPage: number) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return applications.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(applications.length / itemsPerPage);

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Manage Your Applications</h1>
                <div className="w-1/4">
                    <Select onValueChange={(value) => setSortBy(value)}>
                        <SelectTrigger aria-label="Sort by">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="date">Date Submitted</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="jobTitle">Job Title</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getCurrentPageData(sortApplications(applications, sortBy), currentPage, itemsPerPage).map((application) => (
                    <JobApplicationCard key={application._id} application={application} />
                ))}
            </div>

            {applications.length > itemsPerPage && (
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationPrevious
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </PaginationPrevious>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationNext
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </PaginationNext>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
