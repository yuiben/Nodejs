import { UserRole } from "../../constant/Role";

export interface JwtInfo {
  readonly id: string;
  readonly email: string;
  readonly role: UserRole;
}
