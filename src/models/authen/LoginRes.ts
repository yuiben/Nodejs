import { UserRole } from "../../constant/Role";

export class LoginRes {
  key: string;
  email: string;
  pwd: string;
  fullName: string;
  role: UserRole;
  token: string;
  refreshToken: string;
}
