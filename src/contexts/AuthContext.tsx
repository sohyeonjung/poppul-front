import React, { createContext, useState, useEffect } from "react";
import { userService } from "../services/userService";
import type { UserResponse } from "../types/user";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserResponse | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserResponse | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      userService.checkAuth()
        .then((userData: UserResponse) => setUser(userData))
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    userService.logout()
      .then(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
