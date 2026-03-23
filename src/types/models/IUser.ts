export interface IPermission {
  type: string;
}

export type UserRole = "admin" | "manager" | "member" | "user";

export default interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  activeWarehouseId?: string | null;
  premission?: IPermission[];
  createdAt?: Date;
  updatedAt?: Date;
}
