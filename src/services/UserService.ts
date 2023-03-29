import { Service } from "typedi";
import { dataSource } from "../../ormconfig";
import { ResponseMsg } from "../constant/ReponseMsg";
import { Class } from "../entities";
import { ResponseBase } from "../models/base/ResponseBase";
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ValidateService } from "./ValidateService";
import { CreateUserRequest } from "../models/user/CreateUserRequest";
import { ClassRepository } from "../repositories/ClassRepository";
import { CreateUserResponse } from "../models/user/CreateUserResponse";
import { User, UserInfo } from "../entities";
import { UserRepository } from "../repositories/UserRepository";
import { UpdateUserRequest } from "../models/user/UpdateUserRequest";
import { UpdateUserResponse } from "../models/user/UpdateUserResponse";
import ValidateException from "../exceptions/ValidateException";
import { ErrorCode } from "../constant/ErrorCode";
import { ValidateType } from "../constant/ValidateType.Const";
import { GetDetailUserReponse } from "../models/user/GetDetailUserResponse";
import { DeleteUserResponse } from "../models/user/DeleteUserResponse";
import { DeleteUserRequest } from "../models/user/DeleteUserRequest";

@Service()
export class UserService {
  private validateService: ValidateService;

  constructor(
    private userRepository: UserRepository,
    private classRepository: ClassRepository,
  ) {
    this.validateService = new ValidateService();
  }

  public async getListAllUser(): Promise<ResponseBase<GetDetailUserReponse[]>> {

    const userDetail: any = await this.userRepository.getListUser();
    const result: ResponseBase<GetDetailUserReponse[]> = new ResponseBase<GetDetailUserReponse[]>();

    result.data = userDetail;
    return result;
  }

  public async getOneUser(userId: string): Promise<ResponseBase<GetDetailUserReponse>> {

    const userDetail: any = await this.userRepository.getDetailUserById(userId);
    const result: ResponseBase<GetDetailUserReponse> = new ResponseBase<GetDetailUserReponse>();

    result.data = userDetail;
    return result;
  }

  public async create(Req: CreateUserRequest): Promise<ResponseBase<CreateUserResponse> | undefined> {

    this.validateService.init(Req, 'email', 'Email').isEmailAny();
    this.validateService.init(Req, 'birthday', 'Birthday').isValidDate('YYYY/MM/DD');

    const classInstance: Class = await this.classRepository.getClassById(Req.classId);

    //-----------------------------------------------------------------
    // create user data
    await dataSource.manager.transaction(async (transactionalEntityManager) => {
      // create user data
      const newUser: User = new User();
      newUser.name = Req.name;
      newUser.email = Req.email;
      newUser.password = Req.password;
      newUser.class = classInstance;
      await transactionalEntityManager.save(newUser).catch((ex) => {
        throw ex;
      });

      const newUserInfo: UserInfo = new UserInfo();
      newUserInfo.fullname = Req.fullname
      newUserInfo.birthday = Req.birthday
      newUserInfo.user = newUser
      await transactionalEntityManager.save(newUserInfo).catch((ex) => {
        throw ex;
      });
    })
    //-----------------------------------------------------------------
    const result: ResponseBase<CreateUserResponse> = new ResponseBase<CreateUserResponse>();

    result.status = ResponseMsg.SUCCEED

    console.log(result)

    return result;
  }

  public async updateUser(userId: string, userReq: UpdateUserRequest): Promise<ResponseBase<UpdateUserResponse>> {
    const user: User | undefined = await this.userRepository.getUserById(userId).catch((ex) => {
      throw ex;
    });
    // VALIDATE
    if (!user) throw new ValidateException({ errorField: 'userId', errorCode: ValidateType.NOT_FOUND });
    const classInstance: Class = await this.classRepository.getClassById(userReq.classId).catch((ex) => {
      throw ex;
    });
    if (!classInstance) throw new ValidateException({ errorField: 'classId', errorCode: ValidateType.NOT_FOUND });

    // update user data
    await dataSource.manager.transaction(async (transactionalEntityManager) => {
      user.email = userReq.email;
      user.password = userReq.password;
      user.role = userReq.role
      user.class = classInstance;
      await transactionalEntityManager.save(user).catch((ex) => {
        throw ex;
      });

      const userInfo: UserInfo = await this.userRepository.getUserInfoById(userId).catch((ex) => {
        throw ex;
      });

      userInfo.birthday = userReq.birthday
      await transactionalEntityManager.save(userInfo).catch((ex) => {
        throw ex;
      });
    })

    const result: ResponseBase<UpdateUserResponse> = new ResponseBase<UpdateUserResponse>();
    return result;
  }

  public async deleteUser(userId: string): Promise<ResponseBase<DeleteUserResponse>> {
    const user = await this.userRepository.getUserById(userId);
    //VALIDATE
    if (!user) throw new ValidateException({ errorField: 'userId', errorCode: ValidateType.NOT_FOUND });
    await dataSource
      .createQueryBuilder(User, 'user')
      .delete()
      .from(User)
      .where("id = :id", { id: userId })
      .execute().catch((ex) => {
        throw ex;
      });

    const result: ResponseBase<DeleteUserResponse> = new ResponseBase<DeleteUserResponse>();
    result.data = { 'success': true }
    return result;
  }
}