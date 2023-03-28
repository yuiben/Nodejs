// import { Service } from "typedi";
// import { dataSource } from "../../ormconfig";
// import { ResponseMsg } from "../constant/ReponseMsg";
// import { Class } from "../entities/Class";
// import { ResponseBase } from "../models/base/ResponseBase";
// import { CreateClassReponse, CreateClassRequest } from "../models/class/CreateClassRequest";
// import { UpdateClassRequest, UpdateClassResponse } from "../models/class/UpdateClassRequest";
// import ValidateException from '../exceptions/ValidateException';
// import { InjectRepository } from 'typeorm-typedi-extensions';
// import { ErrorCode } from "../constant/ErrorCode";
// import { ValidateService } from "./ValidateService";
// import { DetailClassResponse } from "../models/class/DetailClassResponse";
// import { CreateUserRequest } from "../models/user/CreateUserRequest";
// import { ClassRepository } from "../repositories/ClassRepository";

// @Service()
// export class UserService {
//     private validateService: ValidateService;

//     constructor(
//         @InjectRepository(Class) private classRepository: ClassRepository,
//     ) {
//         this.validateService = new ValidateService();
//     }

//     public async create(classReq: CreateUserRequest): Promise<ResponseBase<CreateClassReponse> | undefined> {
//         //-----------------------------------------------------------------
//         // create user data
//         let newClass: Class = new Class();
//         newClass.className = classReq.className;
//         await dataSource.manager.save(newClass)
//         //-----------------------------------------------------------------
//         const result: ResponseBase<CreateUserRequest> = new ResponseBase<CreateUserRequest>();

//         result.data = classReq

//         result.status = ResponseMsg.SUCCEED

//         console.log(result)

//         return result;
//     }
// }