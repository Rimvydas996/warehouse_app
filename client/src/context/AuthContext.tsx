import React, { createContext, useState, useContext } from "react";
import { apiLogin } from "../api/api";
import LoginResponseInterface from "../model/LoginResponseInterface";
import UserInterface from "../model/UserInterface";

interface CredentialsInterface {
  email: string;
  password: string;
}

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: UserInterface | null;
  login: (inputs: CredentialsInterface) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

const getToken = (): string | null => localStorage.getItem("token");

const getUserData = (): UserInterface | null => {
  console.log("auth");
  const user = localStorage.getItem("user");
  if (!user) {
    return null;
  }
  console.log("isAuth user reiksme", user);
  return JSON.parse(user);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);

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
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login: login, logout }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
