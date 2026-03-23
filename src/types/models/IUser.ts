export interface IPermission {
  type: string;
}

export type UserRole = "admin" | "manager" | "member" | "user";

export default interface IUser {
  _id: string;
  email: string;
  role: UserRole;
  activeWarehouseId?: string | null;
  themePreference?:
    | "sunrise"
    | "ocean"
    | "sage"
    | "slate"
    | "sand"
    | "sunrise-dark"
    | "ocean-dark"
    | "sage-dark"
    | "slate-dark"
    | "sand-dark";
  premission?: IPermission[];
  createdAt?: Date;
  updatedAt?: Date;
}
