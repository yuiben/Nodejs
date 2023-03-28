// import { Controller, Get, Middleware, Post, Put } from '@overnightjs/core';
// import { NextFunction, Request, Response } from 'express';
// import { Service } from 'typedi';
// import { ResponseBase } from '../models/base/ResponseBase';
// import { CreateClassReponse, CreateClassRequest } from '../models/class/CreateClassRequest';
// import { UpdateClassRequest } from '../models/class/UpdateClassRequest';
// import { ClassService } from '../services/ClassService';
// import { UserService } from '../services/UserService';
// import Log from '../utils/Log';

// @Service()
// @Controller('api/user')
// export class UserController {
//     private className = 'UserController';
//     constructor(private readonly userService: UserService) { }

//     @Post('create')
//     private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
//         Log.info(this.className, 'create', `RQ`, { req: req });

//         try {
//             const reqData: CreateClassRequest = <CreateClassRequest>req.body;
//             const result: ResponseBase<CreateClassReponse> = await this.classService.create(reqData).catch((ex) => {
//                 throw ex;
//             });

//             res.status(200).json(result)
//         } catch (ex) {
//             next(ex);
//         }
//     }

// }
