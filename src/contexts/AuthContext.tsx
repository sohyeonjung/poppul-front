import React, { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";
import type { User, AuthState } from "../hooks/useAuth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser()
        .then((userData) => {
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user: userData, token } = await authService.login({ email, password });
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const signup = async (email: string, password: string, name: string) => {
    const { user: userData, token } = await authService.signup({ email, password, name });
    localStorage.setItem('token', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
