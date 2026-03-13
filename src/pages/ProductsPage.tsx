import { useEffect, useState } from "react";
import { apiChangeQuantity, apiDeleteProduct, apiGetAll, apiGetById, apiSetQuantity } from "../services/api/warehouseApi";
import IProduct from "../types/models/IProduct";
import { ExpandLess, MoreVert } from "@mui/icons-material";
import AddProductForm from "../components/features/products/AddProductForm/AddProductForm";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adjustInputs, setAdjustInputs] = useState<Record<string, string>>({});
  const [setInputs, setSetInputs] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

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

  const handleAdjustQuantity = async (id: string) => {
    const rawValue = adjustInputs[id];
    if (!rawValue || rawValue.trim() === "") return;

    const quantity = Number(rawValue);
    if (Number.isNaN(quantity) || quantity === 0) return;

    setUpdatingId(id);

    try {
      const updatedProduct = await apiChangeQuantity(id, quantity);
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)));
      setAdjustInputs((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Failed to adjust quantity", err);
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

  const hasProducts = products.length > 0;

  return (
    <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-8 text-center">
          Product Management
        </h1>
        <AddProductForm onProductCreated={handleProductCreated} />

        {isLoading && (
          <div className="text-amber-900 text-center py-6" role="status" aria-live="polite">
            Loading products...
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

        <ul className="w-full space-y-3 md:space-y-4" aria-busy={isLoading}>
          {products.map((product) => {
            const isExpanded = expandedId === product._id;
            const isUpdating = updatingId === product._id;
            const isDeleting = deletingId === product._id;

            return (
              <li
                key={product._id}
                className="
                  bg-white p-3 md:p-4 rounded-xl
                  shadow-md hover:shadow-lg
                  transition-all duration-200
                  border border-amber-200
                  grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 items-center
                "
              >
                <span className="text-base md:text-lg text-left font-medium col-span-2 text-amber-900">
                  {product.title}
                </span>

                <span className="text-base md:text-lg text-left text-amber-800 col-span-1">
                  Stock: {product.quantity}
                </span>

                <div className="flex justify-end col-span-1">
                  {!isExpanded ? (
                    <button
                      onClick={() => handleMore(product._id)}
                      className="
                        bg-amber-200 p-1.5 md:p-2
                        rounded-lg border border-amber-300
                        hover:bg-amber-300 hover:shadow-md
                        transition-all duration-200
                        text-amber-900
                      "
                      type="button"
                    >
                      <MoreVert className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMore(product._id)}
                      className="
                        bg-amber-200 p-1
                        border-2 border-amber-900 rounded-lg
                        hover:bg-amber-300
                        transition-all duration-200
                      "
                      type="button"
                    >
                      <ExpandLess className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row gap-2 md:justify-end mt-2 md:mt-0">
                    <div className="w-full md:w-auto flex flex-col gap-1 text-sm text-amber-900">
                      <span>
                        Status: {product.supplyStatus ? "In stock" : "Out of stock"}
                      </span>
                      <span>Location: {product.storageLocation}</span>
                    </div>
                    <input
                      type="number"
                      value={adjustInputs[product._id] || ""}
                      onChange={(event) => handleAdjustInputChange(product._id, event.target.value)}
                      placeholder="Add or remove units"
                      className="w-full md:w-auto px-2 py-1 border border-amber-300 rounded"
                      disabled={isUpdating || isDeleting}
                    />
                    <button
                      type="button"
                      onClick={() => handleAdjustQuantity(product._id)}
                      className="
                        bg-amber-200 px-3 py-1
                        rounded-lg border border-amber-300
                        hover:bg-amber-300 hover:shadow-md
                        transition-all duration-200
                        text-amber-900
                        w-full md:w-auto
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                      disabled={isUpdating || isDeleting}
                    >
                      {isUpdating ? "Updating..." : "Adjust"}
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={setInputs[product._id] || ""}
                      onChange={(event) => handleSetInputChange(product._id, event.target.value)}
                      placeholder="Set stock"
                      className="w-full md:w-auto px-2 py-1 border border-amber-300 rounded"
                      disabled={isUpdating || isDeleting}
                    />
                    <button
                      type="button"
                      onClick={() => handleSetQuantity(product._id)}
                      className="
                        bg-amber-200 px-3 py-1
                        rounded-lg border border-amber-300
                        hover:bg-amber-300 hover:shadow-md
                        transition-all duration-200
                        text-amber-900
                        w-full md:w-auto
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                      disabled={isUpdating || isDeleting}
                    >
                      {isUpdating ? "Updating..." : "Set"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(product._id)}
                      className="
                        bg-red-100 px-3 py-1
                        rounded-lg border border-red-200
                        hover:bg-red-200 hover:shadow-md
                        transition-all duration-200
                        text-red-800
                        w-full md:w-auto
                        disabled:opacity-60 disabled:cursor-not-allowed
                      "
                      disabled={isDeleting || isUpdating}
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
