import { useState } from 'react';
import type IProduct from '../../../../types/models/IProduct';

interface IWarehouseProductsThresholdsProps {
    products: IProduct[];
    isUpdating: boolean;
    onUpdateThreshold: (productId: string, threshold: number) => void;
}

export default function WarehouseProductsThresholds({
    products,
    isUpdating,
    onUpdateThreshold,
}: IWarehouseProductsThresholdsProps) {
    const [inputs, setInputs] = useState<Record<string, string>>({});

    const handleChange = (id: string, value: string) => {
        setInputs((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (id: string) => {
        const rawValue = inputs[id];
        if (rawValue === undefined || rawValue.trim() === '') return;
        const value = Number(rawValue);
        if (Number.isNaN(value) || value < 0) return;
        onUpdateThreshold(id, value);
        setInputs((prev) => ({ ...prev, [id]: '' }));
    };

    return (
        <section className='theme-card p-4 md:p-6'>
            <h3 className='text-lg font-semibold theme-label mb-3'>Refill thresholds</h3>
            {products.length === 0 ? (
                <p className='theme-muted text-sm'>No products available.</p>
            ) : (
                <ul className='space-y-2'>
                    {products.map((product) => (
                        <li
                            key={product._id}
                            className='theme-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-3 py-2'
                        >
                            <div>
                                <p className='theme-label text-sm font-medium'>{product.title}</p>
                                <p className='theme-muted text-xs'>
                                    Current stock: {product.quantity} | Threshold: {product.refillThreshold ?? 0}
                                </p>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2'>
                                <input
                                    type='number'
                                    min='0'
                                    value={inputs[product._id] || ''}
                                    onChange={(event) => handleChange(product._id, event.target.value)}
                                    placeholder='Set threshold'
                                    className='w-full md:w-32 px-2 py-1 rounded theme-input'
                                    disabled={isUpdating}
                                />
                                <button
                                    type='button'
                                    onClick={() => handleSubmit(product._id)}
                                    className='theme-button px-3 py-1 rounded-lg transition-all duration-200 w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed'
                                    disabled={isUpdating}
                                >
                                    Update
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
