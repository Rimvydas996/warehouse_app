// export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://warehouse-liart.vercel.app";
// export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not set in environment variables');
}
