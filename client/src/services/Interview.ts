// src/services/InterviewService.ts

import api from '@/helper/api';
import { AxiosError } from 'axios';
import { Interview} from '@/helper/types';

interface ApiResponse {
  statusCode?: number;
  message?: string;
  error?: string;
}

// Get all interviews
export const getAllInterviews = async (): Promise<Interview[]> => {
  try {
    const response = await api.get<Interview[] >('/interviews');
    return response.data;
  } catch (error) {
    throw formatApiError(error);
  }
};

// Get interviews by applicant ID
export const getInterviewsByApplicantId = async (
  applicantId?: string
): Promise<Interview[]> => {
  try {
    const endpoint = applicantId
      ? `/interviews/applicant/${applicantId}`
      : '/interviews/applicant';
    const response = await api.get<{ data: Interview[] }>(endpoint);
    return response.data.data;
  } catch (error) {
    throw formatApiError(error);
  }
};

// Update interview status
export const updateInterviewStatus = async (
  interviewId: string,
  newStatus: 'Scheduled' | 'Completed' | 'Cancelled'
): Promise<Interview> => {
  try {
    const response = await api.put<Interview>(
      `/interviews/${interviewId}/status`,
      { newStatus }
    );
    return response.data;
  } catch (error) {
    throw formatApiError(error);
  }
};

// Helper function to format API errors
const formatApiError = (error: unknown): Error => {
  let errorMessage = 'An unexpected error occurred';

  if (error instanceof AxiosError) {
    if (error.response && error.response.data) {
      const parsedError = error.response.data as ApiResponse;
      errorMessage = parsedError.message || errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return new Error(errorMessage);
};
