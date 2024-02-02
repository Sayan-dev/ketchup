import {
  ApiResponse,
  ContactNumber,
  LoginRequest,
  User,
  UserRegisterRequest,
} from '../../types/entities';
import http from '../http';

const BASE_URL = '/api/auth/students';

export const registerWithEmail = (email: string) =>
  http.post<ApiResponse<{ student: User }>>(`${BASE_URL}/register/email`, { email });

export const verifyEmailHash = (hash: string) =>
  http.get<ApiResponse<{ student: User; token: string }>>(`${BASE_URL}/verify/email/${hash}`);

export const registerWithPhone = (contactNumber: ContactNumber) =>
  http.post<ApiResponse<{ student: User }>>(`${BASE_URL}/register/phone`, { contactNumber });

export const updatePassword = (password: string) =>
  http.post<ApiResponse<{}>>(`${BASE_URL}/update-password`, { password });

export const registerStudent = (data: UserRegisterRequest) =>
  http.post<ApiResponse<{ student: User }>>(`${BASE_URL}/register`, data);

export const verifyStudent = () => http.get<ApiResponse<{ student: User }>>(`${BASE_URL}/verify`);

export const loginAsStudent = (data: LoginRequest) =>
  http.post<ApiResponse<{ student: User; token: string }>>(`${BASE_URL}/login`, data);

export const deactivateAccount = () =>
  http.get<ApiResponse<{ success: boolean }>>(`${BASE_URL}/deactivate`);

export const deleteAccount = () =>
  http.delete<ApiResponse<{ success: boolean }>>(`${BASE_URL}/delete`);
