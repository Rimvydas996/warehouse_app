import axios, { AxiosError } from "axios";
import ProductInterface from "../model/ProductInterface";
import { API_BASE_URL } from "../config/api.config";

/**
 * Fetch all products from the backend
 * Good points:
 * - Returns a typed array of ProductInterface
 * - Handles unexpected responses safely with Array.isArray
 * - Includes auth headers and credentials for secure requests
 * - Catches Axios-specific errors for detailed logging
 */
async function apiGetAll(): Promise<ProductInterface[]> {
    const token = localStorage.getItem("token"); // fetch JWT token

    try {
        const res = await axios.get(`${API_BASE_URL}/warehouse`, {
            headers: {
                Authorization: `Bearer ${token}`, // send token for auth
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true, // allows cookies if backend sets them
        });
        return Array.isArray(res.data) ? res.data : []; // safe fallback if backend returns non-array
    } catch (error) {
        if (error instanceof AxiosError) {
            // Detailed debug info for network/HTTP errors
            console.error("Get all error:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error; // bubble up the error so UI can handle it
    }
}

/**
 * Change quantity of a specific product
 * Good points:
 * - Accepts both product ID and quantity change, keeping logic flexible
 * - Returns the updated product typed as ProductInterface
 * - Sends request body as JSON and handles auth headers
 * - Catches and logs Axios errors specifically
 */
async function apiChangeQuantity(id: string, quantityChange: number): Promise<ProductInterface> {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.patch(
            `${API_BASE_URL}/warehouse/${id}/adjust`, // backend route for +/- quantity
            { quantity: quantityChange }, // clearly sends quantity change in body
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                withCredentials: true,
            },
        );

        return res.data as ProductInterface; // explicit type casting for TS safety
    } catch (error) {
        if (error instanceof AxiosError) {
            // log full error details for debugging backend responses
            console.error("Change quantity error:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

export { apiGetAll, apiChangeQuantity };
