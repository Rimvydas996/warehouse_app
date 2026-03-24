import type IProduct from '../../../../types/models/IProduct';
import type { IProductFilters } from '../../../../utils/products/productsPageHelpers';
import ProductList from '../ProductList';
import AddProductForm from '../AddProductForm';
import { LoadingIndicator } from '../../../common';

interface ProductsSectionProps {
    canCreateProducts: boolean;
    locations: string[];
    isLoading: boolean;
    loadError: string | null;
    hasProducts: boolean;
    hasActiveFilters: boolean;
    filters: IProductFilters;
    products: IProduct[];
    expandedId: string | null;
    adjustInputs: Record<string, string>;
    setInputs: Record<string, string>;
    locationInputs: Record<string, string>;
    thresholdInputs: Record<string, string>;
    isAdmin: boolean;
    canDeleteProducts: boolean;
    updatingId: string | null;
    deletingId: string | null;
    onProductCreated: (product: IProduct) => void;
    onToggleDetails: (id: string) => void;
    onAdjustInputChange: (id: string, value: string) => void;
    onSetInputChange: (id: string, value: string) => void;
    onLocationChange: (id: string, value: string) => void;
    onThresholdChange: (id: string, value: string) => void;
    onFilterChange: (key: keyof IProductFilters, value: string) => void;
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
    hasActiveFilters,
    filters,
    products,
    expandedId,
    adjustInputs,
    setInputs,
    locationInputs,
    thresholdInputs,
    isAdmin,
    canDeleteProducts,
    updatingId,
    deletingId,
    onProductCreated,
    onToggleDetails,
    onAdjustInputChange,
    onSetInputChange,
    onLocationChange,
    onThresholdChange,
    onFilterChange,
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
                <div className='theme-card p-4 md:p-6 mb-6'>
                    <p className='theme-label text-sm'>Only admins and managers can add new items.</p>
                </div>
            )}

            {isLoading && (
                <div className='py-6 flex justify-center'>
                    <LoadingIndicator label='Loading products...' />
                </div>
            )}

            {loadError && (
                <div
                    role='alert'
                    className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-center'
                >
                    {loadError}
                </div>
            )}

            <div className='theme-card p-4 md:p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-3'>
                <div>
                    <label htmlFor='product-filter-title' className='block theme-label text-sm font-medium mb-1'>
                        Filter by name
                    </label>
                    <input
                        id='product-filter-title'
                        type='text'
                        value={filters.title}
                        onChange={(event) => onFilterChange('title', event.target.value)}
                        placeholder='Search product name'
                        className='w-full px-3 py-2 rounded-lg theme-input'
                    />
                </div>

                <div>
                    <label htmlFor='product-filter-location' className='block theme-label text-sm font-medium mb-1'>
                        Filter by location
                    </label>
                    <input
                        id='product-filter-location'
                        type='text'
                        value={filters.location}
                        onChange={(event) => onFilterChange('location', event.target.value)}
                        placeholder='Search storage location'
                        className='w-full px-3 py-2 rounded-lg theme-input'
                    />
                </div>
            </div>

            {!isLoading && !hasProducts && !loadError && (
                <div className='theme-label text-center py-6'>No products available.</div>
            )}

            {!isLoading && hasProducts && !products.length && !loadError && hasActiveFilters && (
                <div className='theme-label text-center py-6'>No products match the selected filters.</div>
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
                canDeleteProducts={canDeleteProducts}
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
