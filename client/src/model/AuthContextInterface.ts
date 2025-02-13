import UserInterface from "./UserInterface";
import CredentialsInterface from "./CredentialsInterface";

export default interface AuthContextInterface {
  isAuthenticated: boolean;
  user: UserInterface | null;
  login: (inputs: CredentialsInterface) => Promise<boolean>;
  logout: () => void;
  getToken: () => string | null;
  getUserData: () => UserInterface | null;
}
