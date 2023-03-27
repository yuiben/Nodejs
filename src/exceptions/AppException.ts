import { ExceptionType } from './ExceptionType';
import HttpException from './HttpException';

export default class AppException extends HttpException {
  // eslint-disable-next-line
  constructor(message: string, data?: any) {
    super(ExceptionType.APPLICATION, 400, message, data);
  }
}
