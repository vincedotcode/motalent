"use client";

import React, { useEffect, useState } from 'react';
import { getAllJobs } from '@/services/job';
import JobCard from '@/components/jobs/jobs-card';
import JobDetails from '@/components/jobs/job-details';
import JobDetailsDialog from '@/components/jobs/job-details-dialog';
import { Job } from '@/helper/types';
import Loader from '@/components/loader';

const JobListing: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleSelectJob = (job: Job) => {
      setSelectedJob(job);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobList = await getAllJobs();
                setJobs(jobList);
                if (jobList.length > 0) {
                    setSelectedJob(jobList[0]); // Select the first job by default
                }
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="flex flex-col md:flex-row items-start justify-center w-full max-w-5xl space-y-6 md:space-y-0 md:space-x-6">
                <div className="flex flex-col space-y-6 md:w-1/2 h-screen overflow-y-auto p-4">
                    {jobs.map((job) => (
                        <JobCard 
                            key={job._id} 
                            job={job} 
                            onSelect={handleSelectJob} 
                            isSelected={selectedJob ? selectedJob._id === job._id : false}
                        />
                    ))}
                </div>
                <div className="hidden md:flex flex-1 h-screen overflow-y-auto p-4">
                    <JobDetails job={selectedJob} />
                </div>
                <div className="md:hidden w-full">
                    <JobDetailsDialog job={selectedJob} />
                </div>
            </div>
        </div>
    );
};

export default JobListing;
``
