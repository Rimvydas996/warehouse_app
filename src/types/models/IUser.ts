export interface IPermission {
  type: string;
}

export default interface IUser {
  _id: string;
  email: string;
  role: string;
  premission: IPermission[];
  createdAt: Date;
  updatedAt: Date;
}
