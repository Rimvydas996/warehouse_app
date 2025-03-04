import axios, { AxiosError } from "axios";
import LoginResponseInterface from "../model/LoginResponseInterface";

const API_BASE_URL = "https://warehouse-liart.vercel.app";

interface LoginData {
  email: string;
  password: string;
}

async function apiLogin(submittedData: LoginData): Promise<LoginResponseInterface | false> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, submittedData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Login error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
  return false;
}
async function apiRegister(submittedData: LoginData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, submittedData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Register error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
  return false;
}

export { apiLogin, apiRegister };
