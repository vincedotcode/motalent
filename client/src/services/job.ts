import api from '@/helper/api';
import { AxiosError } from 'axios';
import {Job, CreateJobData} from '@/helper/types';

interface ApiResponse {
    message: string[];
    error: string;
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

export const createJob = async (jobData: Partial<CreateJobData>): Promise<CreateJobData> => {
    try {
        const response = await api.post<CreateJobData>('/jobs', jobData);
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
