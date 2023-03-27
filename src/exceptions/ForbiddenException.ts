import { ExceptionType } from './ExceptionType';
import HttpException from './HttpException';

export default class ForbiddenException extends HttpException {
  // eslint-disable-next-line
  constructor(message: string, data?: any) {
    super(ExceptionType.APPLICATION, 403, message, data);
  }
}
