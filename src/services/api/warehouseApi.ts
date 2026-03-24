import axios, { AxiosError } from 'axios';
import IProduct from '../../types/models/IProduct';
import { API_BASE_URL } from '../../config/api.config';
import type { IProductFormValues } from '../../types/models/IProductForm';
import type { IProductUpdatePayload } from '../../types/models/IProductUpdate';

const buildAuthHeaders = (token: string | null) => ({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
});

async function apiGetAll(): Promise<IProduct[]> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get(`${API_BASE_URL}/warehouse`, {
            headers: buildAuthHeaders(token),
            withCredentials: true,
        });
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Get all error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiGetById(id: string): Promise<IProduct> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.get(`${API_BASE_URL}/warehouse/${id}`, {
            headers: buildAuthHeaders(token),
            withCredentials: true,
        });
        return res.data as IProduct;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Get by id error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiCreateProduct(payload: IProductFormValues): Promise<IProduct> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.post(`${API_BASE_URL}/warehouse`, payload, {
            headers: buildAuthHeaders(token),
            withCredentials: true,
        });
        return res.data as IProduct;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Create product error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiChangeQuantity(id: string, quantityChange: number): Promise<IProduct> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.patch(
            `${API_BASE_URL}/warehouse/${id}/adjust`,
            { quantity: quantityChange },
            {
                headers: buildAuthHeaders(token),
                withCredentials: true,
            },
        );

        return res.data as IProduct;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Change quantity error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiSetQuantity(id: string, quantity: number): Promise<IProduct> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.patch(
            `${API_BASE_URL}/warehouse/${id}`,
            { quantity },
            {
                headers: buildAuthHeaders(token),
                withCredentials: true,
            },
        );

        return res.data as IProduct;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Set quantity error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiUpdateProduct(id: string, payload: IProductUpdatePayload): Promise<IProduct> {
    const token = localStorage.getItem('token');

    try {
        const res = await axios.patch(`${API_BASE_URL}/warehouse/${id}`, payload, {
            headers: buildAuthHeaders(token),
            withCredentials: true,
        });
        return res.data as IProduct;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Update product error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

async function apiDeleteProduct(id: string): Promise<void> {
    const token = localStorage.getItem('token');

    try {
        await axios.delete(`${API_BASE_URL}/warehouse/${id}`, {
            headers: buildAuthHeaders(token),
            withCredentials: true,
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Delete product error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        }
        throw error;
    }
}

export {
    apiGetAll,
    apiGetById,
    apiCreateProduct,
    apiChangeQuantity,
    apiSetQuantity,
    apiUpdateProduct,
    apiDeleteProduct,
};
