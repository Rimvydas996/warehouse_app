import IUser from "./IUser";
import ICredentials from "../api/ICredentials";

export default interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (inputs: ICredentials) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
  getUserData: () => IUser | null;
  updateUser: (user: IUser | null) => void;
}
