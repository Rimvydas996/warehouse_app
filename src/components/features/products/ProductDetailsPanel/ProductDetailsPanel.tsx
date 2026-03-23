import IProduct from "../../../../types/models/IProduct";
import ProductDeleteButton from "../ProductDeleteButton";
import formatLocationLabel from "../../../../utils/formatters/formatLocationLabel";

interface IProductDetailsPanelProps {
  product: IProduct;
  adjustValue: string;
  setValue: string;
  locationValue: string;
  locations: string[];
  thresholdValue: string;
  isAdmin: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  onAdjustInputChange: (value: string) => void;
  onSetInputChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onThresholdChange: (value: string) => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onSetQuantity: () => void;
  onUpdateLocation: () => void;
  onUpdateThreshold: () => void;
  onDelete: () => void;
}

export default function ProductDetailsPanel({
  product,
  adjustValue,
  setValue,
  locationValue,
  locations,
  thresholdValue,
  isAdmin,
  isUpdating,
  isDeleting,
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
}: IProductDetailsPanelProps) {
  const availableLocations = locations.includes(product.storageLocation)
    ? locations
    : [product.storageLocation, ...locations];

  return (
    <div className="col-span-2 md:col-span-4 flex flex-col gap-2 mt-2 md:mt-0">
      <div className="w-full md:w-auto flex flex-col gap-1 text-sm theme-label">
        <span>Status: {product.supplyStatus ? "In stock" : "Out of stock"}</span>
        <span>Location: {product.storageLocation}</span>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="number"
          value={adjustValue}
          onChange={(event) => onAdjustInputChange(event.target.value)}
          placeholder="Units"
          min="1"
          className="w-full md:w-32 px-2 py-1 rounded theme-input"
          disabled={isUpdating || isDeleting}
        />
        <button
          type="button"
          onClick={onIncreaseQuantity}
          className="theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? "Updating..." : "Increase"}
        </button>
        <button
          type="button"
          onClick={onDecreaseQuantity}
          className="theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? "Updating..." : "Decrease"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <input
          type="number"
          min="0"
          value={setValue}
          onChange={(event) => onSetInputChange(event.target.value)}
          placeholder="Set stock"
          className="w-full md:w-32 px-2 py-1 rounded theme-input"
          disabled={isUpdating || isDeleting}
        />
        <button
          type="button"
          onClick={onSetQuantity}
          className="theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? "Updating..." : "Set"}
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          className="w-full md:w-48 px-2 py-1 rounded theme-input"
          disabled={isUpdating || isDeleting}
        >
          <option value="" disabled>
            Select location
          </option>
          {availableLocations.map((location) => (
            <option key={location} value={location}>
              {formatLocationLabel(location)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onUpdateLocation}
          className="theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isUpdating || isDeleting}
        >
          {isUpdating ? "Updating..." : "Update location"}
        </button>
      </div>
      {isAdmin && (
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="number"
            min="0"
            value={thresholdValue}
            onChange={(event) => onThresholdChange(event.target.value)}
            placeholder="Set threshold"
            className="w-full md:w-32 px-2 py-1 rounded theme-input"
            disabled={isUpdating || isDeleting}
          />
          <button
            type="button"
            onClick={onUpdateThreshold}
            className="theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isUpdating || isDeleting}
          >
            {isUpdating ? "Updating..." : "Update threshold"}
          </button>
          <span className="theme-muted text-xs self-center">
            Current: {product.refillThreshold ?? 0}
          </span>
        </div>
      )}
      <ProductDeleteButton isDeleting={isDeleting} isUpdating={isUpdating} onDelete={onDelete} />
    </div>
  );
}
