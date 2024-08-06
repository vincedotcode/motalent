"use client";

import React, { useEffect, useState } from 'react';
import { getAllJobs } from '@/services/job';
import JobCard from '@/components/jobs/jobs-card';
import { Job } from '@/helper/types';
import Loader from '@/components/loader';


const JobListing: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobList = await getAllJobs();
                setJobs(jobList);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <>
            <Loader />
            </>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
};

export default JobListing;
