import api from '@/helper/api';
import { AxiosError } from 'axios';
import { JobApplication } from '@/helper/types';

interface ApiResponse {
  statusCode: number;
  message: string;
  error: string;
}

interface JobApplicationData {
  jobId: string;
  resumeId: string;
  comments?: string;
}

interface InterviewDetails {
  interviewDate: string;
  interviewTime: string;
  interviewLocation: string;
}

interface AssessmentResult {
  testName: string;
  score: number;
  comments: string;
}

// Create a new job application
export const createJobApplication = async (
  applicationData: Partial<JobApplicationData>
): Promise<JobApplicationData> => {
  try {
    const response = await api.post<JobApplicationData>(
      '/applications',
      applicationData
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Get job application by application ID
export const getJobApplicationById = async (
  applicationId: string
): Promise<JobApplication> => {
  try {
    const response = await api.get<JobApplication>(
      `/applications/${applicationId}`
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Get all job applications by user ID
export const getJobApplicationsByUserId = async (): Promise<
  JobApplication[]
> => {
  try {
    const response = await api.get<JobApplication[]>('/applications/user');
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Get all job applications by job ID
export const getJobApplicationsByJobId = async (
  jobId: string
): Promise<JobApplication[]> => {
  try {
    const response = await api.get<JobApplication[]>(
      `/applications/job/${jobId}`
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Update job application status by application ID
export const updateJobApplicationStatus = async (
  applicationId: string,
  newStatus: string,
  comments?: string
): Promise<JobApplication> => {
  try {
    const response = await api.put<JobApplication>(
      `/applications/${applicationId}/status`,
      { newStatus, comments }
    );
    return response.data;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Delete job application by application ID
export const deleteJobApplication = async (
  applicationId: string
): Promise<void> => {
  try {
    await api.delete(`/applications/${applicationId}`);
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Update job application to add interview details
export const addInterviewToJobApplication = async (
  applicationId: string,
  interviewDetails: InterviewDetails
): Promise<void> => {
  try {
    await api.put(`/applications/${applicationId}/interview`, {
      interviewDetails,
    });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};

// Update job application to add assessment result
export const addAssessmentToJobApplication = async (
  applicationId: string,
  assessmentResult: AssessmentResult
): Promise<void> => {
  try {
    await api.put(`/applications/${applicationId}/assessment`, {
      assessmentResult,
    });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (error instanceof AxiosError) {
      if (error.response) {
        const parsedError = error.response.data as ApiResponse;
        errorMessage = parsedError.message || errorMessage;
      } else if (error.message) {
        try {
          const parsedMessage = JSON.parse(error.message);
          errorMessage = parsedMessage.message || errorMessage;
        } catch {
          errorMessage = error.message;
        }
      }
    } else if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message);
        errorMessage = parsedError.message || errorMessage;
      } catch {
        errorMessage = error.message;
      }
    }

    throw new Error(errorMessage);
  }
};
