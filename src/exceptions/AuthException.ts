import { ExceptionType } from './ExceptionType';
import HttpException from './HttpException';

export default class AuthException extends HttpException {
  // eslint-disable-next-line
  constructor(message: string, data?: any) {
    super(ExceptionType.APPLICATION, 401, message, data);
  }
}
