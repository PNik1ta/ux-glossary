import { ERoles } from "../enums/roles.enum";

export interface IUser {
  id?: number;
  email: string;
  password_hash: string;
  role: ERoles;
  username: string;
  rt?: string;
}
