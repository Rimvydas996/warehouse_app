import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ProductDetailsPanel from './ProductDetailsPanel';
import type IProduct from '../../../../types/models/IProduct';

const PRODUCT: IProduct = {
    _id: 'product-1',
    title: 'Coffee Beans',
    quantity: 8,
    supplyStatus: true,
    storageLocation: 'Shelf A1',
    refillThreshold: 3,
};

const baseProps = {
    product: PRODUCT,
    adjustValue: '',
    setValue: '',
    locationValue: PRODUCT.storageLocation,
    locations: [PRODUCT.storageLocation],
    thresholdValue: '',
    isAdmin: false,
    isUpdating: false,
    isDeleting: false,
    onAdjustInputChange: vi.fn(),
    onSetInputChange: vi.fn(),
    onLocationChange: vi.fn(),
    onThresholdChange: vi.fn(),
    onIncreaseQuantity: vi.fn(),
    onDecreaseQuantity: vi.fn(),
    onSetQuantity: vi.fn(),
    onUpdateLocation: vi.fn(),
    onUpdateThreshold: vi.fn(),
    onDelete: vi.fn(),
};

describe('ProductDetailsPanel', () => {
    it('hides delete button when user cannot delete products', () => {
        render(<ProductDetailsPanel {...baseProps} canDeleteProducts={false} />);

        expect(screen.queryByRole('button', { name: /delete product/i })).not.toBeInTheDocument();
    });

    it('shows delete button when user can delete products', () => {
        render(<ProductDetailsPanel {...baseProps} canDeleteProducts />);

        expect(screen.getByRole('button', { name: /delete product/i })).toBeInTheDocument();
    });
});
