import api from '@/helper/api';
import { AxiosError } from 'axios';
import { Match, CreateMatchData, MatchResponse } from '@/helper/types';

interface ApiResponse {
    message: string[];
    error: string;
}

export const createMatch = async (matchData: Partial<CreateMatchData>): Promise<MatchResponse> => {
    try {
        const response = await api.post<MatchResponse>('/matching', matchData);
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

export const getMatchesByUserId = async (): Promise<Match[]> => {
    try {
        const response = await api.get<Match[]>(`/matching/user`);
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

export const updateMatchStatus = async (matchId: string, status: string, comments?: string): Promise<Match> => {
    try {
        const response = await api.patch<Match>(`/matching/${matchId}/status`, { status, comments });
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

export const deleteMatch = async (matchId: string): Promise<void> => {
    try {
        await api.delete(`/matching/${matchId}`);
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};