import api from '@/helper/api';
import { AxiosError } from 'axios';

interface ApiResponse {
    message: string[];
    error: string;
}

export interface Company {
    _id: string;
    name: string;
    description: string;
    website: string;
    addressLine1: string;
    addressLine2?: string;
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
    affiliatedRecruiters: string[];
    createdAt: string;
    updatedAt: string;
}

export const getAllCompanies = async (): Promise<Company[]> => {
    try {
        const response = await api.get<Company[]>('/companies');
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

export const getCompanyById = async (companyId: string): Promise<Company> => {
    try {
        const response = await api.get<Company>(`/companies/${companyId}`);
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

export const createCompany = async (companyData: Partial<Company>): Promise<Company> => {
    try {
        const response = await api.post<Company>('/companies', companyData);
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

export const updateCompany = async (companyId: string, companyData: Partial<Company>): Promise<Company> => {
    try {
        const response = await api.put<Company>(`/companies/${companyId}`, companyData);
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

export const deleteCompany = async (companyId: string): Promise<void> => {
    try {
        await api.delete(`/companies/${companyId}`);
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
