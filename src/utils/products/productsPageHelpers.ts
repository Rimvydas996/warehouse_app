import type IProduct from "../../types/models/IProduct";
import type { IWarehouseMembership } from "../../types/models/IWarehouse";
import type IUser, { UserRole } from "../../types/models/IUser";

const getAdjustAmount = (inputs: Record<string, string>, id: string) => {
  const rawValue = inputs[id];
  if (!rawValue || rawValue.trim() === "") return null;

  const quantity = Number(rawValue);
  if (Number.isNaN(quantity) || quantity <= 0) return null;

  return quantity;
};

const getRefillItems = (products: IProduct[]) => {
  const items = products.filter((product) => {
    const threshold = product.refillThreshold ?? 0;
    return threshold > 0 && product.quantity <= threshold;
  });

  return { items, count: items.length };
};

const getActiveRole = (user: IUser | null, memberships: IWarehouseMembership[]) => {
  const activeMembership = memberships.find((entry) => entry.isActive);
  return activeMembership?.role ?? user?.role;
};

const isManagerRole = (role?: UserRole | null) => role === "admin" || role === "manager";

const isAdminRole = (role?: UserRole | null) => role === "admin";

export { getAdjustAmount, getRefillItems, getActiveRole, isManagerRole, isAdminRole };
