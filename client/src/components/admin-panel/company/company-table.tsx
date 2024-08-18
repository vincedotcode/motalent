"use client";

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/admin-panel/company/data-table';
import { companyColumns, Company } from './columns';
import { getAllCompanies } from '@/services/company';
import Loader from '@/components/loader';

export function CompaniesTable() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies();
                setCompanies(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <> <Loader/> </>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="mt-4">
            <DataTable columns={companyColumns} data={companies} />
        </div>
    );
}
