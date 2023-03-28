import { CreateUserInfoRequest } from "../userInfo/CreateUserInfoRequest";

export interface CreateUserRequest {
    name: string;
    userInfo: CreateUserInfoRequest
    password: string;
    email: string;
    role: number;
    classId: number;
}
