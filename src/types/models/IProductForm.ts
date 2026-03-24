export interface IProductFormErrors {
    title?: string;
    quantity?: string;
    supplyStatus?: string;
    storageLocation?: string;
    refillThreshold?: string;
}

export interface IProductFormValues {
    readonly title: string;
    readonly quantity: number;
    readonly supplyStatus: boolean;
    readonly storageLocation: string;
    readonly refillThreshold?: number;
}

export interface IProductFormValidationResult {
    readonly errors: IProductFormErrors;
    readonly values: IProductFormValues;
}
