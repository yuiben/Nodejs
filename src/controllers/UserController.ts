import { ClassMiddleware, Controller, Delete, Get, Middleware, Post, Put } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ResponseBase } from '../models/base/ResponseBase';
import { checkJwt } from '../middleware/checkJwt.middleware';
import { CreateClassReponse } from '../models/class/CreateClassRequest';
import { CreateUserRequest } from '../models/user/CreateUserRequest';
import { UserService } from '../services/UserService';
import Log from '../utils/Log';
import { checkRole } from '../middleware/checkRole.middleware';
import { UpdateUserRequest } from '../models/user/UpdateUserRequest';
import { UpdateUserResponse } from '../models/user/UpdateUserResponse';
import { GetDetailUserReponse } from '../models/user/GetDetailUserResponse';

@Service()
@Controller('api/user')
@ClassMiddleware([checkJwt])
export class UserController {
  private className = 'UserController';
  constructor(private readonly userService: UserService) { }

  @Get()
  private async getListUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result: ResponseBase<GetDetailUserReponse[]> = await this.userService.getListAllUser().catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }

  @Get(':userId')
  private async detail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const result: ResponseBase<GetDetailUserReponse> = await this.userService.getOneUser(userId).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }

  @Post('create')
  @Middleware([checkRole])
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'create', `RQ`, { req: req });

    try {
      const reqData: CreateUserRequest = <CreateUserRequest>req.body;
      const result: ResponseBase<CreateClassReponse> = await this.userService.create(reqData).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result)
    } catch (ex) {
      next(ex);
    }
  }

  @Put(':userId')
  @Middleware([checkRole])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: string = req.params.userId;
      const userReq: UpdateUserRequest = <UpdateUserRequest>req.body;
      const result: ResponseBase<UpdateUserResponse> = await this.userService.updateUser(userId, userReq).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }

  @Delete(':userId')
  @Middleware([checkRole])
  private async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId: string = req.params.userId
      const result = await this.userService.deleteUser(userId).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }

}
