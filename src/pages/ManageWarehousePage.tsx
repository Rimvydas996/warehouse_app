import { useAuth } from "../context/AuthContext";
import ProductsPageLayout from "../components/features/products/ProductsPageLayout/ProductsPageLayout";
import WarehouseCreateForm from "../components/features/warehouseManagement/WarehouseCreateForm/WarehouseCreateForm";
import WarehouseManagementPanel from "../components/features/warehouseManagement/WarehouseManagementPanel/WarehouseManagementPanel";
import useProductsPage from "../hooks/products/useProductsPage";
import { getActiveRole, isAdminRole, isManagerRole } from "../utils/products/productsPageHelpers";

export default function ManageWarehousePage() {
  const { user, isReady, updateUser } = useAuth();
  const {
    warehouseOverview,
    warehouses,
    manageError,
    isManaging,
    isCreatingWarehouse,
    showCreateWarehouse,
    setShowCreateWarehouse,
    handleCreateWarehouse,
    handleAddLocation,
    handleRemoveLocation,
    handleAddUser,
    handleUpdateUserRole,
    handleRemoveUser,
    handleUpdateThreshold,
  } = useProductsPage({ user, isReady, updateUser });

  const activeRole = getActiveRole(user, warehouses);
  const isManager = isManagerRole(activeRole);
  const isAdmin = isAdminRole(activeRole);
  const showHeaderCreateToggle = isAdmin && Boolean(user?.activeWarehouseId);
  const shouldShowCreateForm = !user?.activeWarehouseId || showCreateWarehouse;

  return (
    <ProductsPageLayout
      title="Manage Warehouse"
      headerActions={
        showHeaderCreateToggle ? (
          <button
            type="button"
            onClick={() => setShowCreateWarehouse((prev) => !prev)}
            className="theme-button px-3 py-2 rounded-lg transition-all duration-200 w-full md:w-auto"
          >
            {showCreateWarehouse ? "Hide create warehouse" : "Create warehouse"}
          </button>
        ) : null
      }
      headerBottom={
        shouldShowCreateForm ? (
          <WarehouseCreateForm
            onCreate={handleCreateWarehouse}
            isSubmitting={isCreatingWarehouse}
            error={manageError}
            variant="inline"
            showTitle={!user?.activeWarehouseId}
          />
        ) : null
      }
    >
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
    </ProductsPageLayout>
  );
}
