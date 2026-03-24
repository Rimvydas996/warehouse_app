import { useState, type FormEvent } from 'react';
import formatLocationLabel from '../../../../utils/formatters/formatLocationLabel';

interface IWarehouseLocationsManagerProps {
    locations: string[];
    onAddLocation: (location: string) => void;
    onRemoveLocation: (location: string) => void;
    isUpdating: boolean;
}

export default function WarehouseLocationsManager({
    locations,
    onAddLocation,
    onRemoveLocation,
    isUpdating,
}: IWarehouseLocationsManagerProps) {
    const [newLocation, setNewLocation] = useState('');

    const handleAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = newLocation.trim();
        if (!trimmed) return;
        onAddLocation(trimmed);
        setNewLocation('');
    };

    return (
        <section className='theme-card p-4 md:p-6'>
            <h3 className='text-lg font-semibold theme-label mb-3'>Locations</h3>
            <form className='flex flex-col md:flex-row gap-3 mb-4' onSubmit={handleAdd}>
                <input
                    type='text'
                    value={newLocation}
                    onChange={(event) => setNewLocation(event.target.value)}
                    placeholder='Add new location (e.g. aisle-3)'
                    className='w-full md:flex-1 px-3 py-2 rounded theme-input'
                    disabled={isUpdating}
                />
                <button
                    type='submit'
                    className='theme-button px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
                    disabled={isUpdating || !newLocation.trim()}
                >
                    Add location
                </button>
            </form>

            <ul className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {locations.map((location) => (
                    <li key={location} className='theme-subtle flex items-center justify-between px-3 py-2'>
                        <span className='theme-label text-sm'>{formatLocationLabel(location)}</span>
                        <button
                            type='button'
                            onClick={() => onRemoveLocation(location)}
                            className='text-red-700 text-xs font-medium'
                            disabled={isUpdating}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
