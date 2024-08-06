import api from '@/helper/api';
import { AxiosError } from 'axios';

interface ApiResponse {
    message: string[];
    error: string;
}

interface Company {
    _id: string;
    name: string;
    description: string;
    website: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    email: string;
    logo: string;
    bannerImage: string;
    foundedDate: string;
    numberOfEmployees: number;
    industry: string;
    recruiter: string;
    affiliatedRecruiters: string[];
    ratings: any[];
    averageRating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

interface Job {
    _id: string;
    title: string;
    company: Company;
    category: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
    closingDate: string;
    offeredSalary: string;
    experienceLevel: 'Junior' | 'Middle' | 'Senior';
    experience: string;
    remoteWorkOption: boolean;
    expatriateEligibility: boolean;
    keyResponsibilities: string;
    hardSkills: string[];
    softSkills: string[];
    goalsAndPerformanceMetrics: string;
    managementStyle: string;
    careerProgression: string;
    benefitsAndCulture: string;
    candidateSelectionCriteria: string;
    workCondition: string;
    workArrangement: 'On-site' | 'Remote' | 'Hybrid';
    industry: string;
    views: number;
    applicationCount: number;
    status: 'Active' | 'Ending Soon' | 'Closed';
    applicants: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const getAllJobs = async (): Promise<Job[]> => {
    try {
        const response = await api.get<[]>('/jobs');
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const getJobById = async (jobId: string): Promise<Job> => {
    try {
        const response = await api.get<Job>(`/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const createJob = async (jobData: Partial<Job>): Promise<Job> => {
    try {
        const response = await api.post<Job>('/jobs', jobData);
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const updateJobStatus = async (jobId: string, status: string): Promise<Job> => {
    try {
        const response = await api.patch<Job>(`/jobs/${jobId}/status`, { status });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const deleteJob = async (jobId: string): Promise<void> => {
    try {
        await api.delete(`/jobs/${jobId}`);
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
