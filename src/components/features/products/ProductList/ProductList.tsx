import IProduct from '../../../../types/models/IProduct';
import ProductListItem from '../ProductListItem';

interface IProductListProps {
    products: IProduct[];
    expandedId: string | null;
    adjustInputs: Record<string, string>;
    setInputs: Record<string, string>;
    locationInputs: Record<string, string>;
    thresholdInputs: Record<string, string>;
    locations: string[];
    isAdmin: boolean;
    canDeleteProducts: boolean;
    updatingId: string | null;
    deletingId: string | null;
    isLoading: boolean;
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

export default function ProductList({
    products,
    expandedId,
    adjustInputs,
    setInputs,
    locationInputs,
    thresholdInputs,
    locations,
    isAdmin,
    canDeleteProducts,
    updatingId,
    deletingId,
    isLoading,
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
}: IProductListProps) {
    return (
        <ul className='w-full space-y-3 md:space-y-4' aria-busy={isLoading}>
            {products.map((product) => {
                const isExpanded = expandedId === product._id;
                const isUpdating = updatingId === product._id;
                const isDeleting = deletingId === product._id;
                const adjustValue = adjustInputs[product._id] || '';
                const setValue = setInputs[product._id] || '';
                const locationValue = locationInputs[product._id] ?? product.storageLocation ?? '';
                const thresholdValue = thresholdInputs[product._id] || '';

                return (
                    <ProductListItem
                        key={product._id}
                        product={product}
                        isExpanded={isExpanded}
                        isUpdating={isUpdating}
                        isDeleting={isDeleting}
                        adjustValue={adjustValue}
                        setValue={setValue}
                        locationValue={locationValue}
                        locations={locations}
                        thresholdValue={thresholdValue}
                        isAdmin={isAdmin}
                        canDeleteProducts={canDeleteProducts}
                        onToggleDetails={() => onToggleDetails(product._id)}
                        onAdjustInputChange={(value) => onAdjustInputChange(product._id, value)}
                        onSetInputChange={(value) => onSetInputChange(product._id, value)}
                        onLocationChange={(value) => onLocationChange(product._id, value)}
                        onThresholdChange={(value) => onThresholdChange(product._id, value)}
                        onIncreaseQuantity={() => onIncreaseQuantity(product._id)}
                        onDecreaseQuantity={() => onDecreaseQuantity(product._id)}
                        onSetQuantity={() => onSetQuantity(product._id)}
                        onUpdateLocation={() => onUpdateLocation(product._id)}
                        onUpdateThreshold={() => onUpdateThreshold(product._id)}
                        onDelete={() => onDelete(product._id)}
                    />
                );
            })}
        </ul>
    );
}
