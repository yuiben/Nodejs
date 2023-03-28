import { Controller, Get, Post, Put } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ResponseBase } from '../models/base/ResponseBase';
import { CreateClassReponse, CreateClassRequest } from '../models/class/CreateClassRequest';
import { UpdateClassRequest } from '../models/class/UpdateClassRequest';
import { ClassService } from '../services/ClassService';
import Log from '../utils/Log';

@Service()
@Controller('api/v1/class')
export class ClassController {
  private className = 'ClassController';
  constructor(private readonly classService: ClassService) { }

  @Get(':id')
  private async detail(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id
      const result = await this.classService.getOneClass(id).catch((ex) => {
        throw ex;
      });
      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }

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

  @Put('update')
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const brandReq: UpdateClassRequest = <UpdateClassRequest>req.body;
      const result: ResponseBase<CreateClassReponse> = await this.classService.update(brandReq).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
}
