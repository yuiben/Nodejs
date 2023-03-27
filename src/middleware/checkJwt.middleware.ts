import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JwtInfo } from '../utils/auth/JwtInfo';
import { ResponseBase } from '../models/base/ResponseBase';
import Log from '../utils/Log';

export const checkJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //Check format token
    if (!req.headers.authorization) {
      res.status(401).json(new ResponseBase('', 'author_failed'));
      return;
    }
    const authInfo: string[] = req.headers.authorization.split(' ');
    if (authInfo.length !== 2) {
      res.status(401).json(new ResponseBase('', 'author_failed'));
      return;
    }

    const [scheme, token] = authInfo;
    if (scheme === 'Bearer' && token) {
      const jwtToken: string = <string>process.env.JWT_SECRET;

      //Try to validate the token and get data
      const jwtPayload: JwtInfo = jwt.verify(token, jwtToken) as JwtInfo;
      res.locals.jwtPayload = jwtPayload;
      res.locals.jwtPayload.keyThread = new Date().getTime();

      //Call the next middleware or controller
      next();
    } else {
      res.status(401).json(new ResponseBase('', 'author_failed'));
    }
  } catch (error) {
    Log.error('middleware', 'checkJwt', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });

    if (error instanceof jwt.TokenExpiredError) {
      //Token expired
      res.status(401).json(new ResponseBase('', 'token_expired'));
    } else {
      res.status(400).json(new ResponseBase('', 'bad_request'));
    }
  }
};
