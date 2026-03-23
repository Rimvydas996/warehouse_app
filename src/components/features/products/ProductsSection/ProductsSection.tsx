import type IProduct from "../../../../types/models/IProduct";
import ProductList from "../ProductList";
import AddProductForm from "../AddProductForm";
import { LoadingIndicator } from "../../../common";

interface ProductsSectionProps {
  canCreateProducts: boolean;
  locations: string[];
  isLoading: boolean;
  loadError: string | null;
  hasProducts: boolean;
  products: IProduct[];
  expandedId: string | null;
  adjustInputs: Record<string, string>;
  setInputs: Record<string, string>;
  locationInputs: Record<string, string>;
  thresholdInputs: Record<string, string>;
  isAdmin: boolean;
  updatingId: string | null;
  deletingId: string | null;
  onProductCreated: (product: IProduct) => void;
  onToggleDetails: (id: string) => void;
  onAdjustInputChange: (id: string, value: string) => void;
  onSetInputChange: (id: string, value: string) => void;
  onLocationChange: (id: string, value: string) => void;
  onThresholdChange: (id: string, value: string) => void;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onSetQuantity: (id: string) => void;
  onUpdateLocation: (id: string) => void;
  onUpdateThreshold: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ProductsSection({
  canCreateProducts,
  locations,
  isLoading,
  loadError,
  hasProducts,
  products,
  expandedId,
  adjustInputs,
  setInputs,
  locationInputs,
  thresholdInputs,
  isAdmin,
  updatingId,
  deletingId,
  onProductCreated,
  onToggleDetails,
  onAdjustInputChange,
  onSetInputChange,
  onLocationChange,
  onThresholdChange,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onSetQuantity,
  onUpdateLocation,
  onUpdateThreshold,
  onDelete,
}: ProductsSectionProps) {
  return (
    <>
      {canCreateProducts ? (
        <AddProductForm onProductCreated={onProductCreated} locations={locations} />
      ) : (
        <div className="theme-card p-4 md:p-6 mb-6">
          <p className="theme-label text-sm">Only admins and managers can add new items.</p>
        </div>
      )}

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
        <div className="theme-label text-center py-6">No products available.</div>
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
        onToggleDetails={onToggleDetails}
        onAdjustInputChange={onAdjustInputChange}
        onSetInputChange={onSetInputChange}
        onLocationChange={onLocationChange}
        onThresholdChange={onThresholdChange}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onSetQuantity={onSetQuantity}
        onUpdateLocation={onUpdateLocation}
        onUpdateThreshold={onUpdateThreshold}
        onDelete={onDelete}
      />
    </>
  );
}
