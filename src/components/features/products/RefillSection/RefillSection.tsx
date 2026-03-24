import type IProduct from '../../../../types/models/IProduct';
import { LoadingIndicator } from '../../../common';

interface RefillSectionProps {
    isLoading: boolean;
    items: IProduct[];
    count: number;
}

export default function RefillSection({ isLoading, items, count }: RefillSectionProps) {
    return (
        <div className='space-y-3'>
            <h2 className='text-xl font-semibold theme-label'>Items needing refill</h2>
            {isLoading && (
                <div className='py-6 flex justify-center'>
                    <LoadingIndicator label='Loading items...' />
                </div>
            )}
            {!isLoading && (
                <ul className='space-y-2'>
                    {count === 0 ? (
                        <li className='theme-muted text-sm'>No items need refilling.</li>
                    ) : (
                        items.map((product) => (
                            <li key={product._id} className='theme-subtle px-3 py-2'>
                                <p className='theme-label font-medium'>{product.title}</p>
                                <p className='theme-muted text-xs'>
                                    Stock: {product.quantity} | Threshold: {product.refillThreshold ?? 0}
                                </p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
}
