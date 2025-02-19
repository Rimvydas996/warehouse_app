import axios from "axios";
import LoginResponseInterface from "../model/LoginResponseInterface";
import ProductInterface from "../model/ProductInterface";

interface LoginData {
  email: string;
  password: string;
}

async function apiLogin(submittedData: LoginData): Promise<LoginResponseInterface | false> {
  try {
    const response = await axios.post(
      "https://warehouse-liart.vercel.app/auth/login",
      submittedData
    );
    if (response.status >= 200 && response.status < 300) {
      const data = response.data;
      if (typeof data === "object") {
        return data;
      }
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
  return false;
}

async function apiGetAll(token: string | null): Promise<ProductInterface[]> {
  let productData: ProductInterface[] = [];
  const request = await axios.get("https://warehouse-liart.vercel.app/warehouse", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (request.status >= 200 && request.status < 300) {
    productData = request.data;
  }

  return productData;
}

export { apiLogin, apiGetAll };
