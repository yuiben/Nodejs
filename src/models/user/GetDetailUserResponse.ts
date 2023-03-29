import { UserRole } from "../../constant/Role";

export interface GetDetailUserReponse {
  id: string;
  email: string;
  role: UserRole;
  fullname: string;
  birthday: Date;
  classId: number;
  className: string;
}
