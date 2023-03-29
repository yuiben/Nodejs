import { Service } from 'typedi';
import { User } from '../entities';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ResponseBase } from '../models/base/ResponseBase';
import { ValidateService } from './ValidateService';
import { JwtInfo } from '../utils/auth/JwtInfo';
import { LoginRes } from '../models/authen/LoginRes';
import { LoginReq } from '../models/authen/LoginReq';
import { UserRepository } from '../repositories/UserRepository';
import ValidateException from '../exceptions/ValidateException';

@Service()
export class AuthenService {
  private validateService: ValidateService;

  constructor(private userRepository: UserRepository) {
    this.validateService = new ValidateService();
  }

  public async login(loginReq: LoginReq): Promise<ResponseBase<LoginRes> | undefined> {
    this.validateService.init(loginReq, 'email').isNotEmpty();
    this.validateService.init(loginReq, 'password').isNotEmpty();

    const user: User | undefined = await this.userRepository.getUserByEmail(loginReq.email).catch((ex) => {
      throw ex;
    });

    if (user && bcrypt.compareSync(loginReq.password, user.password)) {
      const jwtInfo: JwtInfo = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(jwtInfo, <string>process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });

      const result: ResponseBase<LoginRes> = new ResponseBase<LoginRes>();
      result.data = {
        accessToken: token
      };

      return result;
    } else {
      throw new ValidateException({ errorField: 'token', errorCode: 'invalid' });
    }
  }
}
