import axios, { AxiosError } from "axios";
import LoginResponseInterface from "../model/LoginResponseInterface";
import ProductInterface from "../model/ProductInterface";

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
      withCredentials: true, // This is important for CORS
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

async function apiGetAll(token: string | null): Promise<ProductInterface[]> {
  let productData: ProductInterface[] = [];
  try {
    const request = await axios.get(`${API_BASE_URL}/warehouse`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      withCredentials: true,
    });

    if (request.status >= 200 && request.status < 300) {
      productData = request.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get all error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }

  return productData;
}

// async function ajustQuantity(token: string | null, productId: string, quantity: number) {

export { apiLogin, apiGetAll };
