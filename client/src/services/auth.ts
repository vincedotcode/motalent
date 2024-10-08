import axios, { AxiosError } from 'axios';
import { setUserData } from '@/hooks/useAuth';

interface UserData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    dateOfBirth: string;
    country: string;
    isVerified: boolean;
    role: string;
    openForWork: boolean;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponse {
    message: string;
    user: UserData;
    token: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    addressLine1: string;
    addressLine2?: string;
    dateOfBirth: string;
    country: string;
    role: string;
}

interface ApiResponse {
    message: string[];
    error: string;
}

interface VerifyEmailResponse {
    message: string;
}

interface ForgotPasswordResponse {
    message: string;
}

interface ResetPasswordResponse {
    message: string;
}



export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

    try {
        const response = await axios.post<LoginResponse>(url, credentials);
        setUserData(response.data);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const register = async (credentials: RegisterCredentials): Promise<LoginResponse> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;

    try {
        const response = await axios.post<LoginResponse>(url, credentials);
        const { user, token } = response.data;
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const verifyEmail = async (token: string): Promise<VerifyEmailResponse> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`;

    try {
        const response = await axios.get<VerifyEmailResponse>(url);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};

export const forgotPassword = async (email: string): Promise<ForgotPasswordResponse> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`;

    try {
        const response = await axios.post<ForgotPasswordResponse>(url, { email });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};


export const resetPassword = async (token: string, newPassword: string): Promise<ResetPasswordResponse> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`;

    try {
        const response = await axios.post<ResetPasswordResponse>(url, { token, newPassword });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            throw new Error(JSON.stringify({
                statusCode: axiosError.response.status,
                message: axiosError.response.data.message || ['An unexpected error occurred'],
                error: axiosError.response.data.error || 'Bad Request'
            }));
        } else {
            throw new Error(JSON.stringify({
                statusCode: 500,
                message: ['Network Error or Internal Server Error'],
                error: 'Server Error'
            }));
        }
    }
};
