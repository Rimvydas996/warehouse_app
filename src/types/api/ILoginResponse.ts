import IUser from "../models/IUser";

export default interface ILoginResponse {
  token: string;
  user: IUser;
}
