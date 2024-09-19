'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin-panel/company/data-table';
import { jobColumns } from '@/components/admin-panel/vacancy/columns';
import { Job } from '@/helper/types';
import { getAllJobs } from '@/services/job';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CreateVacancyForm from '@/components/admin-panel/vacancy/create-vacancy';

export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <> <Loader /> </>;
  if (error) return <p>Error: {error}</p>;

  // Function to handle refreshing vacancies
  const refreshVacancies = () => {
    fetchJobs(); // Re-fetch the jobs from the server
  };

  return (
    <div className="mt-4">
      <div className="flex justify-end mb-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">Add Vacancy</Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full">
            <DialogHeader>
              <DialogTitle>Create New Vacancy</DialogTitle>
            </DialogHeader>
            <CreateVacancyForm />
          </DialogContent>
        </Dialog>
      </div>
      {/* Pass refreshVacancies function as prop to DataTable */}
      <DataTable columns={jobColumns(refreshVacancies)} data={jobs} />
    </div>
  );
}