import api from './api';
import type { UserResponse, UserRequest } from '../types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export class AuthService {
  async getCurrentUser(): Promise<UserResponse> {
    const response = await api.get<UserResponse>('/auth/me');
    return response.data;
  }

  async login(data: LoginRequest): Promise<{ user: UserResponse; token: string }> {
    const response = await api.post<{ user: UserResponse; token: string }>('/auth/login', data);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  async signup(data: SignupRequest): Promise<{ user: UserResponse; token: string }> {
    const response = await api.post<{ user: UserResponse; token: string }>('/auth/signup', data);
    return response.data;
  }
}

export const authService = new AuthService();
export default authService; 