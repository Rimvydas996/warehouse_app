import type IProduct from '../../types/models/IProduct';
import type { IWarehouseMembership } from '../../types/models/IWarehouse';
import type IUser from '../../types/models/IUser';
import type { UserRole } from '../../types/models/IUser';

const getAdjustAmount = (inputs: Record<string, string>, id: string) => {
    const rawValue = inputs[id];
    if (!rawValue || rawValue.trim() === '') return null;

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

const normalizeFilterValue = (value: string) => value.trim().toLowerCase();

interface IProductFilters {
    title: string;
    location: string;
}

const filterProducts = (products: IProduct[], filters: IProductFilters) => {
    const titleFilter = normalizeFilterValue(filters.title);
    const locationFilter = normalizeFilterValue(filters.location);

    return products.filter((product) => {
        const matchesTitle = !titleFilter || normalizeFilterValue(product.title).includes(titleFilter);
        const matchesLocation =
            !locationFilter || normalizeFilterValue(product.storageLocation).includes(locationFilter);

        return matchesTitle && matchesLocation;
    });
};

const getActiveRole = (user: IUser | null, memberships: IWarehouseMembership[]) => {
    const activeMembership = memberships.find((entry) => entry.isActive);
    return activeMembership?.role ?? user?.role;
};

const isManagerRole = (role?: UserRole | null) => role === 'admin' || role === 'manager';

const isAdminRole = (role?: UserRole | null) => role === 'admin';

export { filterProducts, getAdjustAmount, getRefillItems, getActiveRole, isManagerRole, isAdminRole };
export type { IProductFilters };
