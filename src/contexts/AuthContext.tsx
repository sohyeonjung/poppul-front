import React, { createContext, useState, useEffect } from "react";
import { User } from "../hooks/useAuth";
import authService from "../services/api";  // default export인 경우

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        setError("인증 확인 중 오류가 발생했습니다.");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData } = await authService.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      setError("로그아웃 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData } = await authService.signup(email, password, name);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
