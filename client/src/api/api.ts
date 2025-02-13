import axios from "axios";
import LoginResponseInterface from "../model/LoginResponseInterface";
import ProductInterface from "../model/ProductInterface";

interface LoginData {
  email: string;
  password: string;
}

async function apiLogin(submittedData: LoginData): Promise<LoginResponseInterface | false> {
  try {
    const response = await axios.post("http://localhost:3001/auth/login", submittedData);
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
  axios
    .get("http://localhost:3001/warehouse", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("response", response);
      const productData: ProductInterface[] = response.data;
      return productData;
      //  response.data;
    });
  return [];
}

export { apiLogin, apiGetAll };
