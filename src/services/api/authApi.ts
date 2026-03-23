import axios, { AxiosError } from "axios";
import ILoginResponse from "../../types/api/ILoginResponse";
import ICredentials from "../../types/api/ICredentials";
import { API_BASE_URL } from "../../config/api.config";

async function apiLogin(submittedData: ICredentials): Promise<ILoginResponse | false> {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, submittedData, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true,
        });

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
async function apiRegister(submittedData: ICredentials) {
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
                error: error.toJSON(),
            });
        }
        throw error;
    }
    return false;
}

async function apiUpdateThemePreference(themePreference: string) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Authentication token missing");
    }
    try {
        const response = await axios.patch(
            `${API_BASE_URL}/auth/theme`,
            { themePreference },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Theme update error details:", {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

export { apiLogin, apiRegister, apiUpdateThemePreference };
