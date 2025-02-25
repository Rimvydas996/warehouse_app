export default interface UserInterface {
  _id: string;
  email: string;
  role: string;
  premission: any[];
  createdAt: Date;
  updatedAt: Date;
}
