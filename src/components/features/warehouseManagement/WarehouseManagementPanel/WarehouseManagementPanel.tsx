import type { IWarehouseOverview } from '../../../../types/models/IWarehouse';
import type { UserRole } from '../../../../types/models/IUser';
import WarehouseCreateForm from '../WarehouseCreateForm';
import WarehouseLocationsManager from '../WarehouseLocationsManager';
import WarehouseUsersManager from '../WarehouseUsersManager';
import WarehouseProductsThresholds from '../WarehouseProductsThresholds';
import { LoadingIndicator } from '../../../common';

interface WarehouseManagementPanelProps {
    manageError: string | null;
    warehouseOverview: IWarehouseOverview | null;
    isAdmin: boolean;
    isManager: boolean;
    isManaging: boolean;
    isCreatingWarehouse: boolean;
    showCreateWarehouse: boolean;
    currentUserId?: string;
    onToggleCreateWarehouse: () => void;
    onCreateWarehouse: (name: string) => Promise<void>;
    onAddLocation: (location: string) => Promise<void>;
    onRemoveLocation: (location: string) => Promise<void>;
    onAddUser: (email: string, role: UserRole) => Promise<void>;
    onUpdateRole: (userId: string, role: UserRole) => Promise<void>;
    onRemoveUser: (userId: string) => Promise<void>;
    onUpdateThreshold: (productId: string, threshold: number) => Promise<void>;
}

export default function WarehouseManagementPanel({
    manageError,
    warehouseOverview,
    isAdmin,
    isManager,
    isManaging,
    isCreatingWarehouse,
    showCreateWarehouse,
    currentUserId,
    onToggleCreateWarehouse,
    onCreateWarehouse,
    onAddLocation,
    onRemoveLocation,
    onAddUser,
    onUpdateRole,
    onRemoveUser,
    onUpdateThreshold,
}: WarehouseManagementPanelProps) {
    if (!isManager) return null;

    return (
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
                <div className='py-6 flex justify-center'>
                    <LoadingIndicator label='Loading warehouse...' />
                </div>
            ) : (
                <>
                    <div className='theme-card p-4 md:p-6'>
                        <h2 className='text-xl font-semibold theme-label'>{warehouseOverview.warehouse.name}</h2>
                        <p className='theme-muted text-sm mt-1'>
                            Locations: {warehouseOverview.warehouse.locations.length}
                        </p>
                    </div>
                    {isAdmin && (
                        <div className='theme-card p-4 md:p-6'>
                            <button
                                type='button'
                                onClick={onToggleCreateWarehouse}
                                className='theme-button px-3 py-2 rounded-lg transition-all duration-200'
                            >
                                {showCreateWarehouse ? 'Hide create warehouse' : 'Create new warehouse'}
                            </button>
                            {showCreateWarehouse && (
                                <div className='mt-4'>
                                    <WarehouseCreateForm
                                        onCreate={onCreateWarehouse}
                                        isSubmitting={isCreatingWarehouse}
                                        error={manageError}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    <WarehouseLocationsManager
                        locations={warehouseOverview.warehouse.locations}
                        onAddLocation={onAddLocation}
                        onRemoveLocation={onRemoveLocation}
                        isUpdating={isManaging}
                    />
                    <WarehouseUsersManager
                        members={warehouseOverview.members}
                        currentUserId={currentUserId}
                        isAdmin={isAdmin}
                        isUpdating={isManaging}
                        onAddUser={onAddUser}
                        onUpdateRole={onUpdateRole}
                        onRemoveUser={onRemoveUser}
                    />
                    {isAdmin && (
                        <WarehouseProductsThresholds
                            products={warehouseOverview.products}
                            isUpdating={isManaging}
                            onUpdateThreshold={onUpdateThreshold}
                        />
                    )}
                </>
            )}
        </div>
    );
}
