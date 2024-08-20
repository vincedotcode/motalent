"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ResumeTemplate from '@/components/resume/resume-template';
import { getResumeById, Resume } from '@/services/resume'; // Assuming this is the correct path to your service

export default function ResumeDetailPage() {
    const { id } = useParams();
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            getResumeById(id as string)
                .then((data) => {
                    setResume(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!resume) {
        return <p>No resume found</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <ResumeTemplate resume={resume} />
            <Footer />
        </div>
    );
}
