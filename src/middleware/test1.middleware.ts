import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from '../models/base/ResponseBase';

// eslint-disable-next-line
export const middlewareTest1 = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware - test1');
  next();
};

// eslint-disable-next-line
export const middlewareTest2 = (req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware - test2');
  next();
};
