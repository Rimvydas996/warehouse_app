import { useAuth } from '../context/AuthContext';
import { ProductsPageLayout, ProductsSection, WarehouseCreateForm } from '../components/features';
import { getActiveRole, isAdminRole, isManagerRole } from '../utils/products/productsPageHelpers';
import useProductsPage from '../hooks/products/useProductsPage';

export default function ProductsPage() {
    const { user, isReady, updateUser } = useAuth();
    const {
        products,
        warehouses,
        expandedId,
        adjustInputs,
        setInputs,
        locationInputs,
        thresholdInputs,
        isLoading,
        loadError,
        manageError,
        isCreatingWarehouse,
        showCreateWarehouse,
        updatingId,
        deletingId,
        hasProducts,
        hasWarehouse,
        locations,
        refillCount,
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
        handleCreateWarehouse,
        handleUpdateThresholdFromList,
    } = useProductsPage({ user, isReady, updateUser });

    const activeRole = getActiveRole(user, warehouses);
    const isManager = isManagerRole(activeRole);
    const isAdmin = isAdminRole(activeRole);
    const canCreateProducts = isManager;
    const showHeaderCreateToggle = isAdmin && hasWarehouse;
    const shouldShowCreateForm = !hasWarehouse || showCreateWarehouse;

    return (
        <ProductsPageLayout
            title='Product Management'
            refillCount={refillCount}
            headerActions={
                showHeaderCreateToggle ? (
                    <button
                        type='button'
                        onClick={() => setShowCreateWarehouse((prev) => !prev)}
                        className='theme-button px-3 py-2 rounded-lg transition-all duration-200 w-full md:w-auto'
                    >
                        {showCreateWarehouse ? 'Hide create warehouse' : 'Create warehouse'}
                    </button>
                ) : null
            }
            headerBottom={
                shouldShowCreateForm ? (
                    <WarehouseCreateForm
                        onCreate={handleCreateWarehouse}
                        isSubmitting={isCreatingWarehouse}
                        error={manageError}
                        variant='inline'
                        showTitle={!hasWarehouse}
                    />
                ) : null
            }
        >
            {hasWarehouse && (
                <ProductsSection
                    canCreateProducts={canCreateProducts}
                    locations={locations}
                    isLoading={isLoading}
                    loadError={loadError}
                    hasProducts={hasProducts}
                    products={products}
                    expandedId={expandedId}
                    adjustInputs={adjustInputs}
                    setInputs={setInputs}
                    locationInputs={locationInputs}
                    thresholdInputs={thresholdInputs}
                    isAdmin={isAdmin}
                    updatingId={updatingId}
                    deletingId={deletingId}
                    onProductCreated={handleProductCreated}
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
            )}
        </ProductsPageLayout>
    );
}
