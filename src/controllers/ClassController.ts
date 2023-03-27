import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ResponseBase } from '../models/base/ResponseBase';
import { CreateClassReponse, CreateClassRequest } from '../models/class/createClass/CreateClassRequest';
import { ClassService } from '../services/ClassService';
import Log from '../utils/Log';

@Service()
@Controller('api/v1/class')
export class ClassController {
  private className = 'ClassController';
  constructor(private readonly classService: ClassService) { }

  @Post('create')
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'create', `RQ`, { req: req });

    try {
      const reqData: CreateClassRequest = <CreateClassRequest>req.body;
      const result: ResponseBase<CreateClassReponse> = await this.classService.create(reqData).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result)
    } catch (ex) {
      next(ex);
    }
  }
}
