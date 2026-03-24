import ProductsPageLayout from '../components/features/products/ProductsPageLayout/ProductsPageLayout';
import WarehouseHomeContainersManager from '../components/features/warehouseManagement/WarehouseHomeContainersManager';
import { useAuth } from '../context/AuthContext';
import useProductsPage from '../hooks/products/useProductsPage';
import { getActiveRole, isManagerRole } from '../utils/products/productsPageHelpers';

export default function HomeContainersPage() {
    const { user, isReady, updateUser } = useAuth();
    const {
        warehouseOverview,
        warehouses,
        manageError,
        isManaging,
        handleAddHomeContainer,
        handleRemoveHomeContainer,
        handleUpdateHomeContainerTasks,
    } = useProductsPage({ user, isReady, updateUser });

    const activeRole = getActiveRole(user, warehouses);
    const isManager = isManagerRole(activeRole);

    return (
        <ProductsPageLayout title='Homepage Containers'>
            {!user?.activeWarehouseId ? (
                <div className='theme-card p-4 md:p-6 text-center'>
                    <p className='theme-muted'>Select an active warehouse to manage homepage containers.</p>
                </div>
            ) : !isManager ? (
                <div className='theme-card p-4 md:p-6 text-center'>
                    <p className='theme-muted'>You do not have permission to manage homepage containers.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {manageError && (
                        <div
                            role='alert'
                            className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center'
                        >
                            {manageError}
                        </div>
                    )}
                    {!warehouseOverview ? (
                        <div className='theme-card p-4 md:p-6 text-center'>
                            <p className='theme-muted'>Loading warehouse containers...</p>
                        </div>
                    ) : (
                        <WarehouseHomeContainersManager
                            containers={warehouseOverview.warehouse.homeContainers ?? []}
                            onAddContainer={handleAddHomeContainer}
                            onRemoveContainer={handleRemoveHomeContainer}
                            onUpdateTasks={handleUpdateHomeContainerTasks}
                            isUpdating={isManaging}
                        />
                    )}
                </div>
            )}
        </ProductsPageLayout>
    );
}
