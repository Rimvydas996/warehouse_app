import type IProduct from './IProduct';
import type { UserRole } from './IUser';

export interface IWarehouse {
    _id: string;
    name: string;
    ownerId: string;
    locations: string[];
    homeContainers?: IHomeContainer[];
}

export interface IWarehouseMember {
    _id: string;
    email: string;
    role: UserRole;
}

export interface IWarehouseMembership {
    warehouse: IWarehouse;
    role: UserRole;
    isActive: boolean;
}

export interface IWarehouseOverview {
    warehouse: IWarehouse;
    members: IWarehouseMember[];
    products: IProduct[];
}

export interface IHomeContainer {
    _id: string;
    title: string;
    description: string;
    tasks: string;
}
