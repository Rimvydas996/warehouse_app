import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import type { IWarehouseMembership } from "../../../types/models/IWarehouse";
import {
  apiGetMyWarehouses,
  apiSetActiveWarehouse,
} from "../../../services/api/warehouseManagementApi";

export default function WarehouseSwitcher() {
  const { user, isAuthenticated, isReady, updateUser } = useAuth();
  const [warehouses, setWarehouses] = useState<IWarehouseMembership[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isReady || !isAuthenticated) return;
    setIsLoading(true);
    apiGetMyWarehouses()
      .then((data) => setWarehouses(data))
      .catch((err) => {
        console.error("Failed to fetch warehouses:", err);
      })
      .finally(() => setIsLoading(false));
  }, [isReady, isAuthenticated]);

  const handleChange = async (warehouseId: string) => {
    if (!warehouseId) return;
    try {
      const updatedUser = await apiSetActiveWarehouse(warehouseId);
      updateUser({ ...(user ?? updatedUser), ...updatedUser });
    } catch (err) {
      console.error("Failed to set active warehouse:", err);
    }
  };

  if (!isAuthenticated || warehouses.length === 0) return null;

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <select
        value={user?.activeWarehouseId ?? ""}
        onChange={(event) => handleChange(event.target.value)}
        className="theme-input px-3 h-10 rounded-lg w-full md:w-56"
        disabled={isLoading}
      >
        <option value="" disabled>
          Select warehouse
        </option>
        {warehouses.map((entry) => (
          <option key={entry.warehouse._id} value={entry.warehouse._id}>
            {entry.warehouse.name} ({entry.role})
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => {
          setIsLoading(true);
          apiGetMyWarehouses()
            .then((data) => setWarehouses(data))
            .catch((err) => console.error("Failed to fetch warehouses:", err))
            .finally(() => setIsLoading(false));
        }}
        className="theme-button px-3 h-10 rounded-lg transition-all duration-200 w-full md:w-auto flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
}
