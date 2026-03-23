import { useEffect, useState } from "react";
import {
  apiChangeQuantity,
  apiDeleteProduct,
  apiGetAll,
  apiGetById,
  apiSetQuantity,
  apiUpdateProduct,
} from "../../services/api/warehouseApi";
import {
  apiAddWarehouseUser,
  apiCreateWarehouse,
  apiGetCurrentWarehouse,
  apiGetMyWarehouses,
  apiRemoveWarehouseUser,
  apiSetActiveWarehouse,
  apiUpdateLocations,
  apiUpdateWarehouseUserRole,
} from "../../services/api/warehouseManagementApi";
import type IProduct from "../../types/models/IProduct";
import type { IWarehouseMembership, IWarehouseOverview } from "../../types/models/IWarehouse";
import type { UserRole } from "../../types/models/IUser";
import type IUser from "../../types/models/IUser";
import { getAdjustAmount, getRefillItems } from "../../utils/products/productsPageHelpers";

interface UseProductsPageParams {
  user: IUser | null;
  isReady: boolean;
  updateUser: (nextUser: IUser | null) => void;
}

export default function useProductsPage({ user, isReady, updateUser }: UseProductsPageParams) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [warehouseOverview, setWarehouseOverview] = useState<IWarehouseOverview | null>(null);
  const [warehouses, setWarehouses] = useState<IWarehouseMembership[]>([]);
  const [isWarehousesLoading, setIsWarehousesLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adjustInputs, setAdjustInputs] = useState<Record<string, string>>({});
  const [setInputs, setSetInputs] = useState<Record<string, string>>({});
  const [locationInputs, setLocationInputs] = useState<Record<string, string>>({});
  const [thresholdInputs, setThresholdInputs] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [manageError, setManageError] = useState<string | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const [isCreatingWarehouse, setIsCreatingWarehouse] = useState(false);
  const [showCreateWarehouse, setShowCreateWarehouse] = useState(false);
  const [activeTab, setActiveTab] = useState<"products" | "manage" | "refill">("products");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;
    setIsWarehousesLoading(true);
    apiGetMyWarehouses()
      .then((data) => setWarehouses(data))
      .catch((err) => {
        console.error("Failed to fetch warehouses:", err);
      })
      .finally(() => setIsWarehousesLoading(false));
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return;
    if (!user?.activeWarehouseId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setLoadError(null);

    apiGetAll()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoadError("Failed to load products. Please try again.");
        setProducts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isReady, user?.activeWarehouseId]);

  useEffect(() => {
    if (!isReady) return;
    if (!user?.activeWarehouseId) return;
    fetchWarehouseOverview().catch((err) => {
      console.error("Failed to fetch warehouse info:", err);
      setManageError("Failed to load warehouse info. Please try again.");
    });
  }, [isReady, user?.activeWarehouseId]);

  const runManageAction = async (
    action: () => Promise<void>,
    errorMessage: string,
    logMessage: string
  ) => {
    setManageError(null);
    setIsManaging(true);
    try {
      await action();
    } catch (err) {
      console.error(logMessage, err);
      setManageError(errorMessage);
    } finally {
      setIsManaging(false);
    }
  };

  const fetchWarehouseOverview = async () => {
    const overview = await apiGetCurrentWarehouse();
    setWarehouseOverview(overview);
  };

  const handleMore = async (id: string) => {
    const isOpen = expandedId === id;
    setExpandedId(isOpen ? null : id);

    if (!isOpen) {
      try {
        const fresh = await apiGetById(id);
        setProducts((prev) => prev.map((product) => (product._id === id ? fresh : product)));
      } catch (err) {
        console.error("Failed to fetch product details:", err);
        setLoadError("Failed to load product details. Please try again.");
      }
    }
  };

  const handleAdjustInputChange = (id: string, value: string) => {
    setAdjustInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSetInputChange = (id: string, value: string) => {
    setSetInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleLocationChange = (id: string, value: string) => {
    setLocationInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleThresholdChange = (id: string, value: string) => {
    setThresholdInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleIncreaseQuantity = async (id: string) => {
    const quantity = getAdjustAmount(adjustInputs, id);
    if (!quantity) return;

    setUpdatingId(id);

    try {
      const updatedProduct = await apiChangeQuantity(id, quantity);
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setAdjustInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to increase quantity", err);
      setLoadError("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDecreaseQuantity = async (id: string) => {
    const quantity = getAdjustAmount(adjustInputs, id);
    if (!quantity) return;

    setUpdatingId(id);

    try {
      const updatedProduct = await apiChangeQuantity(id, -quantity);
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setAdjustInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to decrease quantity", err);
      setLoadError("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSetQuantity = async (id: string) => {
    const rawValue = setInputs[id];
    if (!rawValue || rawValue.trim() === "") return;

    const quantity = Number(rawValue);
    if (Number.isNaN(quantity) || quantity < 0) return;

    setUpdatingId(id);

    try {
      const updatedProduct = await apiSetQuantity(id, quantity);
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setSetInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to set quantity", err);
      setLoadError("Failed to set quantity. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateLocation = async (id: string) => {
    const rawValue = locationInputs[id];
    if (!rawValue || rawValue.trim() === "") return;

    setUpdatingId(id);

    try {
      const updatedProduct = await apiUpdateProduct(id, { storageLocation: rawValue.trim() });
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setLocationInputs((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (err) {
      console.error("Failed to update location", err);
      setLoadError("Failed to update location. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setDeletingId(id);

    try {
      await apiDeleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
      setLoadError("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleProductCreated = (created: IProduct) => {
    setProducts((prev) => [created, ...prev]);
  };

  const refreshWarehouseOverview = async () => {
    await runManageAction(
      async () => {
        await fetchWarehouseOverview();
      },
      "Failed to load warehouse info. Please try again.",
      "Failed to refresh warehouse info:"
    );
  };

  const refreshWarehouses = async () => {
    setIsWarehousesLoading(true);
    try {
      const data = await apiGetMyWarehouses();
      setWarehouses(data);
    } catch (err) {
      console.error("Failed to fetch warehouses:", err);
    } finally {
      setIsWarehousesLoading(false);
    }
  };

  const handleSetActiveWarehouse = async (warehouseId: string) => {
    if (!warehouseId) return;
    await runManageAction(
      async () => {
        const updatedUser = await apiSetActiveWarehouse(warehouseId);
        updateUser({ ...(user ?? updatedUser), ...updatedUser });
        await refreshWarehouses();
        await fetchWarehouseOverview();
      },
      "Failed to set active warehouse. Please try again.",
      "Failed to set active warehouse:"
    );
  };

  const handleCreateWarehouse = async (name: string) => {
    setManageError(null);
    setIsCreatingWarehouse(true);
    try {
      const warehouse = await apiCreateWarehouse(name);
      if (user) {
        updateUser({ ...user, role: "admin", activeWarehouseId: warehouse._id });
      }
      await refreshWarehouseOverview();
      await refreshWarehouses();
    } catch (err) {
      console.error("Failed to create warehouse:", err);
      setManageError("Failed to create warehouse. Please try again.");
    } finally {
      setIsCreatingWarehouse(false);
    }
  };

  const handleAddLocation = async (location: string) => {
    await runManageAction(
      async () => {
        await apiUpdateLocations([location], []);
        await fetchWarehouseOverview();
      },
      "Failed to update locations. Please try again.",
      "Failed to add location:"
    );
  };

  const handleRemoveLocation = async (location: string) => {
    await runManageAction(
      async () => {
        await apiUpdateLocations([], [location]);
        await fetchWarehouseOverview();
      },
      "Failed to update locations. Please try again.",
      "Failed to remove location:"
    );
  };

  const handleAddUser = async (email: string, role: UserRole) => {
    await runManageAction(
      async () => {
        await apiAddWarehouseUser(email, role);
        await fetchWarehouseOverview();
      },
      "Failed to add user. Please try again.",
      "Failed to add user:"
    );
  };

  const handleUpdateUserRole = async (userId: string, role: UserRole) => {
    await runManageAction(
      async () => {
        await apiUpdateWarehouseUserRole(userId, role);
        await fetchWarehouseOverview();
      },
      "Failed to update user role. Please try again.",
      "Failed to update user role:"
    );
  };

  const handleRemoveUser = async (userId: string) => {
    await runManageAction(
      async () => {
        await apiRemoveWarehouseUser(userId);
        await fetchWarehouseOverview();
      },
      "Failed to remove user. Please try again.",
      "Failed to remove user:"
    );
  };

  const handleUpdateThreshold = async (productId: string, threshold: number) => {
    await runManageAction(
      async () => {
        const updated = await apiUpdateProduct(productId, { refillThreshold: threshold });
        setProducts((prev) => prev.map((item) => (item._id === productId ? updated : item)));
        await fetchWarehouseOverview();
      },
      "Failed to update threshold. Please try again.",
      "Failed to update threshold:"
    );
  };

  const handleUpdateThresholdFromList = async (id: string) => {
    const rawValue = thresholdInputs[id];
    if (rawValue === undefined || rawValue.trim() === "") return;
    const value = Number(rawValue);
    if (Number.isNaN(value) || value < 0) return;
    await handleUpdateThreshold(id, value);
    setThresholdInputs((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const hasProducts = products.length > 0;
  const hasWarehouse = Boolean(user?.activeWarehouseId);
  const { items: refillItems, count: refillCount } = getRefillItems(products);
  const locations = warehouseOverview?.warehouse?.locations ?? [];

  return {
    products,
    warehouseOverview,
    warehouses,
    isWarehousesLoading,
    expandedId,
    adjustInputs,
    setInputs,
    locationInputs,
    thresholdInputs,
    isLoading,
    loadError,
    manageError,
    isManaging,
    isCreatingWarehouse,
    showCreateWarehouse,
    activeTab,
    updatingId,
    deletingId,
    hasProducts,
    hasWarehouse,
    locations,
    refillItems,
    refillCount,
    setActiveTab,
    setShowCreateWarehouse,
    handleMore,
    handleAdjustInputChange,
    handleSetInputChange,
    handleLocationChange,
    handleThresholdChange,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleSetQuantity,
    handleUpdateLocation,
    handleDeleteProduct,
    handleProductCreated,
    refreshWarehouseOverview,
    refreshWarehouses,
    handleSetActiveWarehouse,
    handleCreateWarehouse,
    handleAddLocation,
    handleRemoveLocation,
    handleAddUser,
    handleUpdateUserRole,
    handleRemoveUser,
    handleUpdateThreshold,
    handleUpdateThresholdFromList,
  };
}
