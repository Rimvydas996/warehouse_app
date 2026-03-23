import { useAuth } from "../context/AuthContext";
import {
  ProductsPageLayout,
  ProductsSection,
  ProductsTabs,
  RefillSection,
  WarehouseCreateForm,
  WarehouseManagementPanel,
  WarehouseSelectorCard,
} from "../components/features";
import { getActiveRole, isAdminRole, isManagerRole } from "../utils/products/productsPageHelpers";
import useProductsPage from "../hooks/products/useProductsPage";

export default function ProductsPage() {
  const { user, isReady, updateUser } = useAuth();
  const {
    products,
    warehouseOverview,
    warehouses,
    isWarehousesLoading,
    expandedId,
    adjustInputs,
    setInputs,
    locationInputs,
    thresholdInputs,
    isLoading,
    loadError,
    manageError,
    isManaging,
    isCreatingWarehouse,
    showCreateWarehouse,
    activeTab,
    updatingId,
    deletingId,
    hasProducts,
    hasWarehouse,
    locations,
    refillItems,
    refillCount,
    setActiveTab,
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
    refreshWarehouses,
    handleSetActiveWarehouse,
    handleCreateWarehouse,
    handleAddLocation,
    handleRemoveLocation,
    handleAddUser,
    handleUpdateUserRole,
    handleRemoveUser,
    handleUpdateThreshold,
    handleUpdateThresholdFromList,
  } = useProductsPage({ user, isReady, updateUser });

  const activeRole = getActiveRole(user, warehouses);
  const isManager = isManagerRole(activeRole);
  const isAdmin = isAdminRole(activeRole);
  const canCreateProducts = isManager;

  return (
    <ProductsPageLayout title="Product Management">
      {!hasWarehouse && (
        <div className="mb-6">
          <WarehouseCreateForm
            onCreate={handleCreateWarehouse}
            isSubmitting={isCreatingWarehouse}
            error={manageError}
          />
        </div>
      )}

      <WarehouseSelectorCard
        warehouses={warehouses}
        isLoading={isWarehousesLoading}
        activeWarehouseId={user?.activeWarehouseId}
        onSetActiveWarehouse={handleSetActiveWarehouse}
        onRefresh={refreshWarehouses}
      />

      {hasWarehouse && (
        <ProductsTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          showManage={isManager}
          refillCount={refillCount}
        />
      )}

      {activeTab === "products" && hasWarehouse && (
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

      {activeTab === "refill" && hasWarehouse && (
        <RefillSection isLoading={isLoading} items={refillItems} count={refillCount} />
      )}

      {activeTab === "manage" && hasWarehouse && (
        <WarehouseManagementPanel
          manageError={manageError}
          warehouseOverview={warehouseOverview}
          isAdmin={isAdmin}
          isManager={isManager}
          isManaging={isManaging}
          isCreatingWarehouse={isCreatingWarehouse}
          showCreateWarehouse={showCreateWarehouse}
          currentUserId={user?._id}
          onToggleCreateWarehouse={() => setShowCreateWarehouse((prev) => !prev)}
          onCreateWarehouse={handleCreateWarehouse}
          onAddLocation={handleAddLocation}
          onRemoveLocation={handleRemoveLocation}
          onAddUser={handleAddUser}
          onUpdateRole={handleUpdateUserRole}
          onRemoveUser={handleRemoveUser}
          onUpdateThreshold={handleUpdateThreshold}
        />
      )}
    </ProductsPageLayout>
  );
}
