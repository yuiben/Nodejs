import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { middlewareTest1, middlewareTest2 } from '../middleware/test1.middleware';
import { ResponseBase } from '../models/base/ResponseBase';

@Service()
@Controller('api/v1/test')
export class TestController {
  @Post('create')
  private async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // const reqData = Regis
      res.status(200).json(
        new ResponseBase({
          msg: 'hello'
        })
      );
    } catch (ex) {
      next(ex);
    }
  }
}
