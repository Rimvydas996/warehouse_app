import { useEffect, useState } from "react";
import {
  apiChangeQuantity,
  apiDeleteProduct,
  apiGetAll,
  apiGetById,
  apiSetQuantity,
  apiUpdateProduct,
} from "../services/api/warehouseApi";
import IProduct from "../types/models/IProduct";
import { useAuth } from "../context/AuthContext";
import {
  AddProductForm,
  ProductList,
  WarehouseCreateForm,
  WarehouseLocationsManager,
  WarehouseProductsThresholds,
  WarehouseUsersManager,
} from "../components/features";
import { LoadingIndicator } from "../components/common";
import {
  apiAddWarehouseUser,
  apiCreateWarehouse,
  apiGetCurrentWarehouse,
  apiGetMyWarehouses,
  apiRemoveWarehouseUser,
  apiSetActiveWarehouse,
  apiUpdateLocations,
  apiUpdateWarehouseUserRole,
} from "../services/api/warehouseManagementApi";
import type { IWarehouseMembership, IWarehouseOverview } from "../types/models/IWarehouse";
import type { UserRole } from "../types/models/IUser";

export default function ProductsPage() {
  const { user, isReady, updateUser } = useAuth();
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
    apiGetCurrentWarehouse()
      .then((data) => setWarehouseOverview(data))
      .catch((err) => {
        console.error("Failed to fetch warehouse info:", err);
        setManageError("Failed to load warehouse info. Please try again.");
      });
  }, [isReady, user?.activeWarehouseId]);

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

  const getAdjustAmount = (id: string) => {
    const rawValue = adjustInputs[id];
    if (!rawValue || rawValue.trim() === "") return null;

    const quantity = Number(rawValue);
    if (Number.isNaN(quantity) || quantity <= 0) return null;

    return quantity;
  };

  const handleIncreaseQuantity = async (id: string) => {
    const quantity = getAdjustAmount(id);
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
    const quantity = getAdjustAmount(id);
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
    setManageError(null);
    setIsManaging(true);
    try {
      const overview = await apiGetCurrentWarehouse();
      setWarehouseOverview(overview);
    } catch (err) {
      console.error("Failed to refresh warehouse info:", err);
      setManageError("Failed to load warehouse info. Please try again.");
    } finally {
      setIsManaging(false);
    }
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
    setIsManaging(true);
    try {
      const updatedUser = await apiSetActiveWarehouse(warehouseId);
      updateUser({ ...(user ?? updatedUser), ...updatedUser });
      await refreshWarehouses();
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to set active warehouse:", err);
      setManageError("Failed to set active warehouse. Please try again.");
    } finally {
      setIsManaging(false);
    }
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
    setManageError(null);
    setIsManaging(true);
    try {
      await apiUpdateLocations([location], []);
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to add location:", err);
      setManageError("Failed to update locations. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  const handleRemoveLocation = async (location: string) => {
    setManageError(null);
    setIsManaging(true);
    try {
      await apiUpdateLocations([], [location]);
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to remove location:", err);
      setManageError("Failed to update locations. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  const handleAddUser = async (email: string, role: UserRole) => {
    setManageError(null);
    setIsManaging(true);
    try {
      await apiAddWarehouseUser(email, role);
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to add user:", err);
      setManageError("Failed to add user. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  const handleUpdateUserRole = async (userId: string, role: UserRole) => {
    setManageError(null);
    setIsManaging(true);
    try {
      await apiUpdateWarehouseUserRole(userId, role);
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to update user role:", err);
      setManageError("Failed to update user role. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  const handleRemoveUser = async (userId: string) => {
    setManageError(null);
    setIsManaging(true);
    try {
      await apiRemoveWarehouseUser(userId);
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to remove user:", err);
      setManageError("Failed to remove user. Please try again.");
    } finally {
      setIsManaging(false);
    }
  };

  const handleUpdateThreshold = async (productId: string, threshold: number) => {
    setManageError(null);
    setIsManaging(true);
    try {
      const updated = await apiUpdateProduct(productId, { refillThreshold: threshold });
      setProducts((prev) => prev.map((item) => (item._id === productId ? updated : item)));
      await refreshWarehouseOverview();
    } catch (err) {
      console.error("Failed to update threshold:", err);
      setManageError("Failed to update threshold. Please try again.");
    } finally {
      setIsManaging(false);
    }
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
  const activeMembership = warehouses.find((entry) => entry.isActive);
  const activeRole = activeMembership?.role ?? user?.role;
  const isManager = activeRole === "admin" || activeRole === "manager";
  const isAdmin = activeRole === "admin";
  const locations = warehouseOverview?.warehouse?.locations ?? [];
  const refillItems = products.filter((product) => {
    const threshold = product.refillThreshold ?? 0;
    return threshold > 0 && product.quantity <= threshold;
  });
  const refillCount = refillItems.length;

  return (
    <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-8 text-center">
          Product Management
        </h1>

        {!hasWarehouse && (
          <div className="mb-6">
            <WarehouseCreateForm
              onCreate={handleCreateWarehouse}
              isSubmitting={isCreatingWarehouse}
              error={manageError}
            />
          </div>
        )}

        {warehouses.length > 0 && (
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-amber-200 mb-6">
            <h2 className="text-lg font-semibold text-amber-900 mb-2">Your warehouses</h2>
            {isWarehousesLoading ? (
              <LoadingIndicator label="Loading warehouses..." />
            ) : (
              <div className="flex flex-col md:flex-row gap-3">
                <select
                  value={user?.activeWarehouseId ?? ""}
                  onChange={(event) => handleSetActiveWarehouse(event.target.value)}
                  className="w-full md:flex-1 px-3 py-2 border border-amber-300 rounded bg-white"
                >
                  <option value="" disabled>
                    Select active warehouse
                  </option>
                  {warehouses.map((entry) => (
                    <option key={entry.warehouse._id} value={entry.warehouse._id}>
                      {entry.warehouse.name} ({entry.role})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={refreshWarehouses}
                  className="
                    bg-amber-200 px-3 py-2
                    rounded-lg border border-amber-300
                    hover:bg-amber-300 hover:shadow-md
                    transition-all duration-200
                    text-amber-900
                    w-full md:w-auto
                  "
                >
                  Refresh
                </button>
              </div>
            )}
          </div>
        )}

        {hasWarehouse && (
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeTab === "products"
                  ? "bg-amber-900 text-amber-50 border-amber-900"
                  : "bg-amber-200 text-amber-900 border-amber-300"
              }`}
            >
              Products
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("refill")}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                activeTab === "refill"
                  ? "bg-amber-900 text-amber-50 border-amber-900"
                  : "bg-amber-200 text-amber-900 border-amber-300"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                Refill Needed
                {refillCount > 0 && (
                  <span className="text-xs font-semibold bg-red-600 text-white px-2 py-0.5 rounded-full">
                    {refillCount}
                  </span>
                )}
              </span>
            </button>
            {isManager && (
              <button
                type="button"
                onClick={() => setActiveTab("manage")}
                className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeTab === "manage"
                    ? "bg-amber-900 text-amber-50 border-amber-900"
                    : "bg-amber-200 text-amber-900 border-amber-300"
                }`}
              >
                Manage Warehouse
              </button>
            )}
          </div>
        )}

        {activeTab === "products" && hasWarehouse && (
          <>
            <AddProductForm onProductCreated={handleProductCreated} locations={locations} />

            {isLoading && (
              <div className="py-6 flex justify-center">
                <LoadingIndicator label="Loading products..." />
              </div>
            )}

            {loadError && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center"
              >
                {loadError}
              </div>
            )}

            {!isLoading && !hasProducts && !loadError && (
              <div className="text-amber-900 text-center py-6">No products available.</div>
            )}

            <ProductList
              products={products}
              expandedId={expandedId}
              adjustInputs={adjustInputs}
              setInputs={setInputs}
              locationInputs={locationInputs}
              thresholdInputs={thresholdInputs}
              locations={locations}
              isAdmin={isAdmin}
              updatingId={updatingId}
              deletingId={deletingId}
              isLoading={isLoading}
              onToggleDetails={handleMore}
              onAdjustInputChange={handleAdjustInputChange}
              onSetInputChange={handleSetInputChange}
              onLocationChange={handleLocationChange}
              onThresholdChange={handleThresholdChange}
              onIncreaseQuantity={handleIncreaseQuantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onSetQuantity={handleSetQuantity}
              onUpdateLocation={handleUpdateLocation}
              onUpdateThreshold={handleUpdateThresholdFromList}
              onDelete={handleDeleteProduct}
            />
          </>
        )}

        {activeTab === "refill" && hasWarehouse && (
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-amber-900">Items needing refill</h2>
            {isLoading && (
              <div className="py-6 flex justify-center">
                <LoadingIndicator label="Loading items..." />
              </div>
            )}
            {!isLoading && (
              <ul className="space-y-2">
                {refillCount === 0 ? (
                  <li className="text-amber-800 text-sm">No items need refilling.</li>
                ) : (
                  refillItems.map((product) => (
                    <li
                      key={product._id}
                      className="bg-white border border-amber-200 rounded-lg px-3 py-2"
                    >
                      <p className="text-amber-900 font-medium">{product.title}</p>
                      <p className="text-amber-700 text-xs">
                        Stock: {product.quantity} | Threshold: {product.refillThreshold ?? 0}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        )}

        {activeTab === "manage" && hasWarehouse && isManager && (
          <div className="space-y-4">
            {manageError && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center"
              >
                {manageError}
              </div>
            )}
            {!warehouseOverview ? (
              <div className="py-6 flex justify-center">
                <LoadingIndicator label="Loading warehouse..." />
              </div>
            ) : (
              <>
                <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-amber-200">
                  <h2 className="text-xl font-semibold text-amber-900">
                    {warehouseOverview.warehouse.name}
                  </h2>
                  <p className="text-amber-700 text-sm mt-1">
                    Locations: {warehouseOverview.warehouse.locations.length}
                  </p>
                </div>
                {isAdmin && (
                  <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-amber-200">
                    <button
                      type="button"
                      onClick={() => setShowCreateWarehouse((prev) => !prev)}
                      className="
                        bg-amber-200 px-3 py-2
                        rounded-lg border border-amber-300
                        hover:bg-amber-300 hover:shadow-md
                        transition-all duration-200
                        text-amber-900
                      "
                    >
                      {showCreateWarehouse ? "Hide create warehouse" : "Create new warehouse"}
                    </button>
                    {showCreateWarehouse && (
                      <div className="mt-4">
                        <WarehouseCreateForm
                          onCreate={handleCreateWarehouse}
                          isSubmitting={isCreatingWarehouse}
                          error={manageError}
                        />
                      </div>
                    )}
                  </div>
                )}
                <WarehouseLocationsManager
                  locations={warehouseOverview.warehouse.locations}
                  onAddLocation={handleAddLocation}
                  onRemoveLocation={handleRemoveLocation}
                  isUpdating={isManaging}
                />
                <WarehouseUsersManager
                  members={warehouseOverview.members}
                  currentUserId={user?._id}
                  isAdmin={isAdmin}
                  isUpdating={isManaging}
                  onAddUser={handleAddUser}
                  onUpdateRole={handleUpdateUserRole}
                  onRemoveUser={handleRemoveUser}
                />
                {isAdmin && (
                  <WarehouseProductsThresholds
                    products={warehouseOverview.products}
                    isUpdating={isManaging}
                    onUpdateThreshold={handleUpdateThreshold}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
