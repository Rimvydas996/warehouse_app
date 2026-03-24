import { describe, expect, it } from 'vitest';
import { filterProducts, isAdminRole, isManagerRole } from './productsPageHelpers';
import type IProduct from '../../types/models/IProduct';

const PRODUCTS: IProduct[] = [
    {
        _id: '1',
        title: 'Coffee Beans',
        quantity: 10,
        supplyStatus: true,
        storageLocation: 'Shelf A1',
    },
    {
        _id: '2',
        title: 'Green Tea',
        quantity: 6,
        supplyStatus: true,
        storageLocation: 'Cold Room',
    },
];

describe('productsPageHelpers', () => {
    it('filters products by title and location without case sensitivity', () => {
        const result = filterProducts(PRODUCTS, {
            title: 'coffee',
            location: 'a1',
        });

        expect(result).toEqual([PRODUCTS[0]]);
    });

    it('keeps delete permissions for admin and manager roles only', () => {
        expect(isManagerRole('admin')).toBe(true);
        expect(isManagerRole('manager')).toBe(true);
        expect(isManagerRole('user')).toBe(false);
        expect(isManagerRole('member')).toBe(false);
        expect(isAdminRole('admin')).toBe(true);
        expect(isAdminRole('manager')).toBe(false);
    });
});
