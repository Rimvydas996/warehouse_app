export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://warehouse-liart.vercel.app";

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not set in environment variables");
}
