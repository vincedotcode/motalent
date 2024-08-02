import { useCallback } from 'react';
import Cookies from 'js-cookie';

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

export const setUserData = (loginResponse: LoginResponse) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userData', JSON.stringify(loginResponse.user));
    Cookies.set('token', loginResponse.token, { secure: true, sameSite: 'strict', expires: 2 });
  }
};

export const getUserData = (): UserData | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('userData');
    return userData ? (JSON.parse(userData) as UserData) : null;
  }
  return null;
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return Cookies.get('token') || null;
  }
  return null;
};

export const clearUserData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('userData');
    Cookies.remove('token');
  }
};
