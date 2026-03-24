import { describe, it, expect } from 'vitest';
import { validateProductForm } from './productValidators';

const buildFormData = (entries: Record<string, string>) => {
    const formData = new FormData();
    Object.entries(entries).forEach(([key, value]) => {
        formData.set(key, value);
    });
    return formData;
};

describe('validateProductForm', () => {
    it('returns errors for missing fields', () => {
        const formData = buildFormData({
            title: '',
            quantity: '',
            storageLocation: '',
        });

        const result = validateProductForm(formData);

        expect(result.errors.title).toBe('Title is required');
        expect(result.errors.quantity).toBe('Quantity must be a positive number');
        expect(result.errors.supplyStatus).toBe('Supply status must be selected');
        expect(result.errors.storageLocation).toBe('Storage location must be selected');
    });

    it('normalizes values for valid inputs', () => {
        const formData = buildFormData({
            title: '  Coffee Beans  ',
            quantity: '5',
            supplyStatus: 'true',
            storageLocation: 'warehouse-a',
        });

        const result = validateProductForm(formData);

        expect(result.errors).toEqual({});
        expect(result.values).toEqual({
            title: 'Coffee Beans',
            quantity: 5,
            supplyStatus: true,
            storageLocation: 'warehouse-a',
        });
    });
});
