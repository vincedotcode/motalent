import axios, { AxiosError } from 'axios';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export const sendContactForm = async (data: ContactFormData): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/contact`;

  try {
    const response = await axios.post<ApiResponse>(url, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    if (axiosError.response) {
      throw new Error(JSON.stringify({
        statusCode: axiosError.response.status,
        message: axiosError.response.data.message || 'An unexpected error occurred',
        error: axiosError.response || 'Bad Request'
      }));
    } else {
      throw new Error(JSON.stringify({
        statusCode: 500,
        message: 'Network Error or Internal Server Error',
        error: 'Server Error'
      }));
    }
  }
};
