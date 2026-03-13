import React, { createContext, useState, useContext, useEffect } from "react";
import { apiLogin } from "../services/api/authApi";
import ILoginResponse from "../types/api/ILoginResponse";
import IUser from "../types/models/IUser";
import ICredentials from "../types/api/ICredentials";
import IAuthContext from "../types/models/IAuthContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<IAuthContext & { isReady: boolean }>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  getToken: () => null,
  getUserData: () => null,
  isReady: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = getToken();

    if (token) {
      const user = getUserData();
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
      }
    }
    setIsReady(true);
    return () => {
      setIsAuthenticated(false);
      setUser(null);
    };
  }, []);
  const getToken = (): string | null => localStorage.getItem("token");

  const getUserData = (): IUser | null => {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  };
  const login = async (inputs: ICredentials): Promise<boolean> => {
    const user: ILoginResponse | false = await apiLogin(inputs);

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
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login: login, logout, getToken, getUserData, isReady }}
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
