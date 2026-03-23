import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../config/api.config";
import type { IWarehouseMembership, IWarehouseOverview } from "../../types/models/IWarehouse";
import type { UserRole } from "../../types/models/IUser";

const buildAuthHeaders = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  Accept: "application/json",
});

async function apiCreateWarehouse(name: string) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `${API_BASE_URL}/warehouses`,
      { name },
      { headers: buildAuthHeaders(token), withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Create warehouse error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiGetCurrentWarehouse(): Promise<IWarehouseOverview> {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_BASE_URL}/warehouses/current`, {
      headers: buildAuthHeaders(token),
      withCredentials: true,
    });
    return res.data as IWarehouseOverview;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get warehouse error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiGetMyWarehouses(): Promise<IWarehouseMembership[]> {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`${API_BASE_URL}/warehouses`, {
      headers: buildAuthHeaders(token),
      withCredentials: true,
    });
    return res.data as IWarehouseMembership[];
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Get my warehouses error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiSetActiveWarehouse(warehouseId: string) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.patch(
      `${API_BASE_URL}/warehouses/active`,
      { warehouseId },
      { headers: buildAuthHeaders(token), withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Set active warehouse error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiUpdateLocations(add: string[], remove: string[]) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.patch(
      `${API_BASE_URL}/warehouses/current/locations`,
      { add, remove },
      { headers: buildAuthHeaders(token), withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Update locations error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiAddWarehouseUser(email: string, role: UserRole) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      `${API_BASE_URL}/warehouses/current/users`,
      { email, role },
      { headers: buildAuthHeaders(token), withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Add warehouse user error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiUpdateWarehouseUserRole(userId: string, role: UserRole) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.patch(
      `${API_BASE_URL}/warehouses/current/users/${userId}`,
      { role },
      { headers: buildAuthHeaders(token), withCredentials: true }
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Update user role error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

async function apiRemoveWarehouseUser(userId: string) {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.delete(`${API_BASE_URL}/warehouses/current/users/${userId}`, {
      headers: buildAuthHeaders(token),
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Remove warehouse user error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
    throw error;
  }
}

export {
  apiCreateWarehouse,
  apiGetCurrentWarehouse,
  apiGetMyWarehouses,
  apiSetActiveWarehouse,
  apiUpdateLocations,
  apiAddWarehouseUser,
  apiUpdateWarehouseUserRole,
  apiRemoveWarehouseUser,
};
