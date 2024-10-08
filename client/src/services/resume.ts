import api from '@/helper/api';
import { AxiosError } from 'axios';

interface ApiResponse {
    message: string[];
    error: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    country: string;
    description?: string;
}

interface Education {
    id?: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string | null;
    endDate: string | null;
    grade: string;
    current: boolean;
  }

  interface Experience {
    id?: number;
    jobTitle: string;
    companyName: string;
    startDate: string | null;
    endDate: string | null;
    responsibilities: string;
    current: boolean;
  }

export interface CustomSection {
    title: string;
    content: string;
}

export interface Website {
    name: string;
    url: string;
}

export interface Resume {
    _id: string;
    userId: string;
    resumeName: string;
    template: string;
    personalInfo: PersonalInfo;
    education: Education[];
    experience: Experience[];
    skills: string[];
    languages: string[];
    hobbies: string[];
    customSections: CustomSection[];
    websites: Website[];
    completionPercentage: number;
    createdAt: string;
    updatedAt: string;
}

export const getResumesByUserId = async (userId: string): Promise<Resume[]> => {
    try {
        const response = await api.get<Resume[]>(`/resumes/${userId}/resumes`);
        console.log(response.data);
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

export const getResumeById = async (resumeId: string): Promise<Resume> => {
    try {
        const response = await api.get<Resume>(`/resumes/${resumeId}`);
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

export const createResume = async (userId: string, resumeData: Partial<Resume>): Promise<Resume> => {
    try {
        const response = await api.post<Resume>(`/resumes/${userId}/resume`, resumeData);
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

export const updateResume = async (resumeId: string, resumeData: Partial<Resume>): Promise<Resume> => {
    try {
        const response = await api.put<Resume>(`/resumes/${resumeId}`, resumeData);
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

export const deleteResume = async (resumeId: string): Promise<void> => {
    try {
        await api.delete(`/resumes/${resumeId}`);
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

export const addSectionToResume = async (resumeId: string, sectionName: string, sectionData: object): Promise<Resume> => {
    try {
        const response = await api.put<Resume>(`/resumes/${resumeId}/section`, {
            sectionName,
            sectionData,
        });
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

export const deleteSectionFromResume = async (resumeId: string, sectionName: string, sectionId: string): Promise<Resume> => {
    try {
        const response = await api.delete<Resume>(`/resumes/${resumeId}/section`, {
            data: {
                sectionName,
                sectionId,
            },
        });
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
