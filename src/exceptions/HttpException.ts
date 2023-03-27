import { ResponseBase } from '../models/base/ResponseBase';
import { ExceptionType } from './ExceptionType';

export default class HttpException extends Error {
  exType: ExceptionType = ExceptionType.RUNTIME;
  statusCode = 400;

  // eslint-disable-next-line
  data: ResponseBase<any>;

  // eslint-disable-next-line
  constructor(exType: ExceptionType, statusCode: number, message: string, data?: any) {
    super(message);
    this.exType = exType;
    this.statusCode = statusCode || 400;
    // eslint-disable-next-line
    this.data = new ResponseBase<any>(data, message);
  }
}
