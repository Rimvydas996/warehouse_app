import type { IWarehouseMembership } from '../../../../types/models/IWarehouse';
import { LoadingIndicator } from '../../../common';

interface WarehouseSelectorCardProps {
    warehouses: IWarehouseMembership[];
    isLoading: boolean;
    activeWarehouseId?: string | null;
    onSetActiveWarehouse: (warehouseId: string) => void;
    onRefresh: () => void;
}

export default function WarehouseSelectorCard({
    warehouses,
    isLoading,
    activeWarehouseId,
    onSetActiveWarehouse,
    onRefresh,
}: WarehouseSelectorCardProps) {
    if (warehouses.length === 0) return null;

    return (
        <div className='theme-card p-4 md:p-6 mb-6'>
            <h2 className='text-lg font-semibold theme-label mb-2'>Your warehouses</h2>
            {isLoading ? (
                <LoadingIndicator label='Loading warehouses...' />
            ) : (
                <div className='flex flex-col md:flex-row gap-3'>
                    <select
                        value={activeWarehouseId ?? ''}
                        onChange={(event) => onSetActiveWarehouse(event.target.value)}
                        className='w-full md:flex-1 px-3 py-2 rounded theme-input'
                    >
                        <option value='' disabled>
                            Select active warehouse
                        </option>
                        {warehouses.map((entry) => (
                            <option key={entry.warehouse._id} value={entry.warehouse._id}>
                                {entry.warehouse.name} ({entry.role})
                            </option>
                        ))}
                    </select>
                    <button
                        type='button'
                        onClick={onRefresh}
                        className='theme-button px-3 py-2 rounded-lg transition-all duration-200 w-full md:w-auto'
                    >
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
}
