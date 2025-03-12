// src/service/userService.ts
import api from './api';
import type { UserRequest, UserResponse } from '../types/user';

class UserService {
  async register(data: UserRequest): Promise<UserResponse> {
    const response = await api.post<UserResponse>('/register', data);
    return response.data;
  }

  async login(data: UserRequest): Promise<UserResponse> {
    const response = await api.post<UserResponse>('/login', data);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post('/logout');
  }

  async checkAuth(): Promise<UserResponse> {
    const response = await api.get<UserResponse>('/check-auth');
    return response.data;
  }
}

export const userService = new UserService();
export type { UserRequest, UserResponse };