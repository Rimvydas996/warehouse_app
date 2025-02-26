export interface Permission {
  type: string;
}

export default interface UserInterface {
  _id: string;
  email: string;
  role: string;
  premission: Permission[];
  createdAt: Date;
  updatedAt: Date;
}
