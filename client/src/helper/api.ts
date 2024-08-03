import axios, { AxiosError, AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

interface ApiResponse {
    message: string[];
    error: string;
}

const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<ApiResponse>) => {
        if (error.response) {
            return Promise.reject(
                new Error(
                    JSON.stringify({
                        statusCode: error.response.status,
                        message: error.response.data.message || ['An unexpected error occurred'],
                        error: error.response.data.error || 'Bad Request',
                    })
                )
            );
        } else {
            return Promise.reject(
                new Error(
                    JSON.stringify({
                        statusCode: 500,
                        message: ['Network Error or Internal Server Error'],
                        error: 'Server Error',
                    })
                )
            );
        }
    }
);

export default api;
