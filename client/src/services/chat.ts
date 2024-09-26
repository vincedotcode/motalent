// chatService.ts
import api from '@/helper/api';
import { AxiosError } from 'axios';
import { ChatRequest, ChatResponse } from '@/helper/types';

export interface ApiResponse {
    message: string[];
    error: string;
}

// Function to interact with the AI chat service
export const sendChatQuery = async (chatData: ChatRequest): Promise<ChatResponse> => {
    console.log('Sending chat request:', chatData); // Log request before sending

    try {
        const response = await api.post<ChatResponse>('/ai/chat', chatData);
        console.log('Response:', response.data); // Log response
        return response.data;
    } catch (error) {
        console.error('Error during chat request:', error); // Log error
        if (error instanceof AxiosError && error.response) {
            const parsedError = error.response.data as ApiResponse;
            throw new Error(parsedError.message.join(', '));
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};
