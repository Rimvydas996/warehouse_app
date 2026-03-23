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
import { AddProductForm, ProductList } from "../components/features";
import { LoadingIndicator } from "../components/common";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [adjustInputs, setAdjustInputs] = useState<Record<string, string>>({});
  const [setInputs, setSetInputs] = useState<Record<string, string>>({});
  const [locationInputs, setLocationInputs] = useState<Record<string, string>>({});
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

  const handleLocationChange = (id: string, value: string) => {
    setLocationInputs((prev) => ({ ...prev, [id]: value }));
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
      setLocationInputs((prev) => ({ ...prev, [id]: "" }));
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

  const hasProducts = products.length > 0;

  return (
    <div className="rounded-2xl bg-gradient-to-r my-3 md:my-5 from-amber-400 to-amber-300 py-4 md:py-8 px-2 md:px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-4 md:mb-8 text-center">
          Product Management
        </h1>
        <AddProductForm onProductCreated={handleProductCreated} />

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
          updatingId={updatingId}
          deletingId={deletingId}
          isLoading={isLoading}
          onToggleDetails={handleMore}
          onAdjustInputChange={handleAdjustInputChange}
          onSetInputChange={handleSetInputChange}
          onLocationChange={handleLocationChange}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onSetQuantity={handleSetQuantity}
          onUpdateLocation={handleUpdateLocation}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
}
