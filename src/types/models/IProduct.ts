export default interface IProduct {
  title: string;
  quantity: number;
  supplyStatus: boolean;
  storageLocation: string;
  _id: string;
  refillThreshold?: number;
  warehouseId?: string;
}
