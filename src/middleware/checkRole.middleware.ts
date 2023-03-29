import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../constant/Role';
import { ResponseBase } from '../models/base/ResponseBase';
import { JwtInfo } from '../utils/auth/JwtInfo';
import Log from '../utils/Log';

export const checkRole = async (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line
  try {
    const jwtPayload: JwtInfo = <JwtInfo>res.locals.jwtPayload;
    let inRole: boolean = false;
    if (jwtPayload.role === UserRole.TEACHER) {
      inRole = true;
    }
    if (inRole) {
      //Call the next middleware or controller
      next();
    } else {
      res.status(403).json(new ResponseBase('', 'forbidden'));
    }
  } catch (err) {
    Log.error('middleware', 'checkRole', err, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });
    res.status(400).json(new ResponseBase('', 'bad_request'));
  }
};
