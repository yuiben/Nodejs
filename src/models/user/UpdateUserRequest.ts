import { UserRole } from "../../constant/Role";

export interface UpdateUserRequest {
  email: string;
  password: string;
  role: UserRole;
  fullname: string;
  birthday: Date;
  classId: number;
}
