import api from '@/helper/api';
import { AxiosError } from 'axios';

interface ApiResponse {
    message: string[];
    error: string;
}

export interface Template {
    _id: string;
    name: string;
    description: string;
    thumbnail: string;
    templateFile: string;
    isDefault: boolean;
}

export const getAllTemplates = async (): Promise<Template[]> => {
    try {
        const response = await api.get<Template[]>('/templates');
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

export const getTemplateById = async (templateId: string): Promise<Template> => {
    try {
        const response = await api.get<Template>(`/templates/${templateId}`);
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

export const createTemplate = async (templateData: Partial<Template>): Promise<Template> => {
    try {
        const response = await api.post<Template>('/templates', templateData);
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

export const updateTemplate = async (templateId: string, templateData: Partial<Template>): Promise<Template> => {
    try {
        const response = await api.put<Template>(`/templates/${templateId}`, templateData);
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

export const deleteTemplate = async (templateId: string): Promise<void> => {
    try {
        await api.delete(`/templates/${templateId}`);
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
