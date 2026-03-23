import IProduct from "../../../../types/models/IProduct";
import ProductDetailsPanel from "../ProductDetailsPanel";
import ProductDetailsToggleButton from "../ProductDetailsToggleButton";

interface IProductListItemProps {
  product: IProduct;
  isExpanded: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  adjustValue: string;
  setValue: string;
  locationValue: string;
  locations: string[];
  thresholdValue: string;
  isAdmin: boolean;
  onToggleDetails: () => void;
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

export default function ProductListItem({
  product,
  isExpanded,
  isUpdating,
  isDeleting,
  adjustValue,
  setValue,
  locationValue,
  locations,
  thresholdValue,
  isAdmin,
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
}: IProductListItemProps) {
  return (
    <li
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
        <ProductDetailsToggleButton isExpanded={isExpanded} onToggle={onToggleDetails} />
      </div>

      {isExpanded && (
        <ProductDetailsPanel
          product={product}
          adjustValue={adjustValue}
          setValue={setValue}
          locationValue={locationValue}
          locations={locations}
          thresholdValue={thresholdValue}
          isAdmin={isAdmin}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
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
      )}
    </li>
  );
}
