import { Service } from "typedi";
import { dataSource } from "../../ormconfig";
import { ResponseMsg } from "../constant/ReponseMsg";
import { Class } from "../entities/Class";
import { ResponseBase } from "../models/base/ResponseBase";
import { CreateClassReponse, CreateClassRequest } from "../models/class/CreateClassRequest";
import { UpdateClassRequest, UpdateClassResponse } from "../models/class/UpdateClassRequest";
import ValidateException from '../exceptions/ValidateException';
import { ErrorCode } from "../constant/ErrorCode";
import { ValidateService } from "./ValidateService";
import { DetailClassResponse } from "../models/class/DetailClassResponse";
import { ListAllClassResponse } from "../models/class/ListAllClass";

@Service()
export class ClassService {
    private validateService: ValidateService;

    constructor() {
        this.validateService = new ValidateService();
    }

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

    public async update(classReq: UpdateClassRequest): Promise<ResponseBase<UpdateClassResponse> | undefined> {
        const classId: string = classReq.id
        const classIntance: Class = await dataSource.manager.findOneBy(Class, { id: classId }).catch((ex) => {
            throw ex;
        });

        if (!classIntance) throw this.validateService.inValid(!classIntance)

        await dataSource.manager.update(Class, { id: classReq.id }, classReq).catch((ex) => {
            throw ex;
        });

        //Get Data

        const result: ResponseBase<CreateClassReponse> = new ResponseBase<CreateClassReponse>();

        result.data = classReq
        result.status = ResponseMsg.SUCCEED

        return result;
    }

    public async listAllClass(): Promise<ResponseBase<ListAllClassResponse[]>> {
        const classes = await dataSource.manager
            .createQueryBuilder()
            .select(["class.id", "class.className"])
            .from(Class, "class")
            .getMany()

        const result: ResponseBase<ListAllClassResponse[]> = new ResponseBase<ListAllClassResponse[]>();

        result.data = classes;

        return result;
    }

    public async getOneClass(id: string): Promise<ResponseBase<DetailClassResponse>> {
        console.log('asda')
        console.log(id)

        const classInstance = await dataSource.manager
            .createQueryBuilder(Class, "class")
            .where("class.id = :id", { id: id })
            .getOne().catch((ex) => {
                throw ex;
            });
        console.log(classInstance)
        if (!classInstance) throw this.validateService.inValid(!classInstance)

        const result: ResponseBase<DetailClassResponse> = new ResponseBase<DetailClassResponse>();

        result.data = classInstance;
        return result;
    }
}