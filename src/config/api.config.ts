export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173/";

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not set in environment variables");
}
