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
