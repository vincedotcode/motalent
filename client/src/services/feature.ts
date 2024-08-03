import api from '@/helper/api';
import { AxiosError } from 'axios';

interface ApiResponse {
    message: string[];
    error: string;
}

interface FeatureSuggestion {
    featureTitle: string;
    featureDescription: string;
}

interface FeatureSuggestionResponse {
    userId: string;
    featureTitle: string;
    featureDescription: string;
    status: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const createFeatureSuggestion = async (suggestion: FeatureSuggestion): Promise<FeatureSuggestionResponse> => {
    try {
        const response = await api.post<FeatureSuggestionResponse>('/feature/feature-suggestions', suggestion);
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

export const getFeatureSuggestions = async (): Promise<FeatureSuggestionResponse[]> => {
    try {
        const response = await api.get<FeatureSuggestionResponse[]>('/feature/feature-suggestions');
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

export const updateFeatureSuggestionStatus = async (suggestionId: string, status: string, comments?: string): Promise<FeatureSuggestionResponse> => {
    try {
        const response = await api.patch<FeatureSuggestionResponse>('/feature/feature-suggestions/status', { suggestionId, status, comments });
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
