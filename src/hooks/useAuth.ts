import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { UserResponse } from '../types/user';

// User 타입을 UserResponse로 재정의
export type User = UserResponse;

// AuthState 타입 정의
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth; 