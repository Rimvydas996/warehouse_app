export interface IProductFormErrors {
    title?: string;
    quantity?: string;
    supplyStatus?: string;
    storageLocation?: string;
}

export interface IProductFormValues {
    readonly title: string;
    readonly quantity: number;
    readonly supplyStatus: boolean;
    readonly storageLocation: string;
}

export interface IProductFormValidationResult {
    readonly errors: IProductFormErrors;
    readonly values: IProductFormValues;
}

/**
 * Validates and normalizes Add Product form data.
 */
export function validateProductForm(formData: FormData): IProductFormValidationResult {
    const errors: IProductFormErrors = {};

    const title = formData.get("title")?.toString().trim() || "";
    const quantityStr = formData.get("quantity")?.toString().trim() || "";
    const supplyStatusStr = formData.get("supplyStatus")?.toString().trim();
    const storageLocation = formData.get("storageLocation")?.toString().trim() || "";

    const quantity = Number(quantityStr);
    const supplyStatus = supplyStatusStr === "true";

    if (!title) errors.title = "Title is required";
    if (!quantityStr || Number.isNaN(quantity) || quantity <= 0) {
        errors.quantity = "Quantity must be a positive number";
    }
    if (!supplyStatusStr) errors.supplyStatus = "Supply status must be selected";
    if (!storageLocation) errors.storageLocation = "Storage location must be selected";

    return {
        errors,
        values: { title, quantity, supplyStatus, storageLocation },
    };
}
