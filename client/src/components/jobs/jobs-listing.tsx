"use client";

import React, { useEffect, useState } from 'react';
import { getAllJobs } from '@/services/job';
import JobCard from '@/components/jobs/jobs-card';
import JobDetails from '@/components/jobs/job-details';
import JobDetailsDialog from '@/components/jobs/job-details-dialog';
import { Job } from '@/helper/types';
import Loader from '@/components/loader';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useMediaQuery from '@/hooks/use-media-query'; 

const JobListing: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [jobsPerPage] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const isMobile = useMediaQuery('(max-width: 767px)');

    const handleSelectJob = (job: Job) => {
        setSelectedJob(job);
        if (isMobile) {
            setDialogOpen(true);
        }
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobList = await getAllJobs();
                setJobs(jobList);
                if (jobList.length > 0) {
                    setSelectedJob(jobList[0]);
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
                <div className="flex flex-col space-y-6 md:w-1/2 p-4">
                    {currentJobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                            onSelect={handleSelectJob}
                            isSelected={selectedJob ? selectedJob._id === job._id : false}
                        />
                    ))}
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage > 1) {
                                                paginate(currentPage - 1);
                                            }
                                        }}
                                        className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                paginate(index + 1);
                                            }}
                                            isActive={index + 1 === currentPage}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                {totalPages > 3 && currentPage < totalPages && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (currentPage < totalPages) {
                                                paginate(currentPage + 1);
                                            }
                                        }}
                                        className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
                <div className="hidden md:flex flex-1 p-4">
                    <div className="overflow-y-auto w-full h-full">
                        <JobDetails job={selectedJob} />
                    </div>
                </div>
                {isMobile && (
                    <div className="md:hidden w-full">
                        <JobDetailsDialog 
                            job={selectedJob} 
                            open={dialogOpen} 
                            onOpenChange={setDialogOpen} 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListing;
