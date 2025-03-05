import axios, { AxiosError } from "axios";
import ProductInterface from "../model/ProductInterface";
const API_BASE_URL = "https://warehouse-liart.vercel.app";

async function apiGetAll(): Promise<ProductInterface[]> {
  const token = localStorage.getItem("token");

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

export { apiGetAll };
