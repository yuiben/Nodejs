import { Service } from "typedi";
import { dataSource } from "../../ormconfig";
import { ResponseMsg } from "../constant/ReponseMsg";
import { Class } from "../entities/Class";
import { ResponseBase } from "../models/base/ResponseBase";
import { CreateClassReponse, CreateClassRequest } from "../models/class/createClass/CreateClassRequest";

@Service()
export class ClassService {
    public async create(classReq: CreateClassRequest): Promise<ResponseBase<CreateClassReponse> | undefined> {
        //-----------------------------------------------------------------
        // create user data
        let newClass: Class = new Class();
        newClass.className = classReq.className;
        await dataSource.manager.save(newClass)
        //-----------------------------------------------------------------
        const result: ResponseBase<CreateClassReponse> = new ResponseBase<CreateClassReponse>();

        result.data = {
            id: newClass.id,
            className: newClass.className
        };

        result.status = ResponseMsg.SUCCEED

        console.log(result)

        return result;
    }
}