import { Request, Response, NextFunction } from 'express';
import Log from '../utils/Log';
import { ResponseBase } from '../models/base/ResponseBase';

// eslint-disable-next-line
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const status: number = error.statusCode || 400;
  Log.error('middleware', 'errorHandler', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });

  if (error.data) {
    res.status(status).json(error.data);
  } else {
    // eslint-disable-next-line
    const errorData: ResponseBase<any> = new ResponseBase<any>('', 'bad_request');
    res.status(status).json(errorData);
  }
};
