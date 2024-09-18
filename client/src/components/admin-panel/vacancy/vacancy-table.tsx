// JobsTable.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin-panel/company/data-table';
import { jobColumns } from '@/components/admin-panel/vacancy/columns';
import { Job } from '@/helper/types';
import { getAllJobs } from '@/services/job';
import Loader from '@/components/loader';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import CreateVacancyForm from "@/components/admin-panel/vacancy/create-vacancy";
export default function JobsTable() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await getAllJobs();
                setJobs(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <> <Loader /> </>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-4">
            <div className='flex justify-end mb-1'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="default">Add Vacancy</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Vacancy</DialogTitle>
                        </DialogHeader>
                        <CreateVacancyForm />
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={jobColumns} data={jobs} />
        </div>

    );
}
