import { Controller, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";
import { LoginReq } from "../models/authen/LoginReq";
import { LoginRes } from "../models/authen/LoginRes";
import { ResponseBase } from "../models/base/ResponseBase";
import { AuthenService } from "../services/AuthenService";


@Service()
@Controller('api/auth')
export class AuthController {
  private className = 'AuthController';
  constructor(private readonly authenService: AuthenService) { }

  @Post('login')
  private async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginReq: LoginReq = <LoginReq>req.body;
      const result: ResponseBase<LoginRes> = await this.authenService.login(loginReq).catch((ex) => {
        throw ex;
      });

      res.status(200).json(result);
    } catch (ex) {
      next(ex);
    }
  }
}
