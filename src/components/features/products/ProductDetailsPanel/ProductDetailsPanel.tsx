import IProduct from "../../../../types/models/IProduct";
import ProductDeleteButton from "../ProductDeleteButton";
import { PRODUCT_LOCATIONS } from "../../../../utils/productLocations/productLocations";

interface IProductDetailsPanelProps {
  product: IProduct;
  adjustValue: string;
  setValue: string;
  locationValue: string;
  isUpdating: boolean;
  isDeleting: boolean;
  onAdjustInputChange: (value: string) => void;
  onSetInputChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onSetQuantity: () => void;
  onUpdateLocation: () => void;
  onDelete: () => void;
}

export default function ProductDetailsPanel({
  product,
  adjustValue,
  setValue,
  locationValue,
  isUpdating,
  isDeleting,
  onAdjustInputChange,
  onSetInputChange,
  onLocationChange,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onSetQuantity,
  onUpdateLocation,
  onDelete,
}: IProductDetailsPanelProps) {
  return (
    <div className="col-span-2 md:col-span-4 flex flex-col gap-2 mt-2 md:mt-0">
      <div className="w-full md:w-auto flex flex-col gap-1 text-sm text-amber-900">
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
          className="w-full md:w-32 px-2 py-1 border border-amber-300 rounded"
          disabled={isUpdating || isDeleting}
        />
        <button
          type="button"
          onClick={onIncreaseQuantity}
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
          {isUpdating ? "Updating..." : "Increase"}
        </button>
        <button
          type="button"
          onClick={onDecreaseQuantity}
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
          className="w-full md:w-32 px-2 py-1 border border-amber-300 rounded"
          disabled={isUpdating || isDeleting}
        />
        <button
          type="button"
          onClick={onSetQuantity}
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
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <select
          value={locationValue}
          onChange={(event) => onLocationChange(event.target.value)}
          className="w-full md:w-48 px-2 py-1 border border-amber-300 rounded bg-white"
          disabled={isUpdating || isDeleting}
        >
          <option value="" disabled>
            Select location
          </option>
          {PRODUCT_LOCATIONS.map((location) => (
            <option key={location.value} value={location.value}>
              {location.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onUpdateLocation}
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
          {isUpdating ? "Updating..." : "Update location"}
        </button>
      </div>
      <ProductDeleteButton isDeleting={isDeleting} isUpdating={isUpdating} onDelete={onDelete} />
    </div>
  );
}
