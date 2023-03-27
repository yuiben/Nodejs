import { UserRole } from "../../constant/Role";

export interface JwtInfo {
  readonly key: string;
  readonly email: string;
  readonly role: UserRole;
  readonly fullName: string;

  keyThread?: number;
}
