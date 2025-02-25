import React, { createContext, useState, useContext, useEffect } from "react";
import { apiLogin } from "../api/api";
import LoginResponseInterface from "../model/LoginResponseInterface";
import UserInterface from "../model/UserInterface";
import CredentialsInterface from "../model/CredentialsInterface";
import AuthContextInterface from "../model/AuthContextInterface";

export const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  getToken: () => null,
  getUserData: () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const token = getToken();

    if (token) {
      const user = getUserData();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    }
    return () => {
      setIsAuthenticated(false);
      setUser(null);
    };
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const getToken = (): string | null => localStorage.getItem("token");

  const getUserData = (): UserInterface | null => {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  };
  const login = async (inputs: CredentialsInterface): Promise<boolean> => {
    const user: LoginResponseInterface | false = await apiLogin(inputs);

    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify(user.user));
      setIsAuthenticated(true);
      setUser(user.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login: login, logout, getToken, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
