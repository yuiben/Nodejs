import { CreateUserInfoRequest } from "../userInfo/CreateUserInfoRequest";

export interface CreateUserRequest {
    name: string;
    fullname: string;
    birthday: Date;
    password: string;
    email: string;
    role: number;
    classId: number;
}
