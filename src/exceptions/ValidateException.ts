import { VldItem } from '../services/ValidateService';
import { ExceptionType } from './ExceptionType';
import HttpException from './HttpException';

export default class ValidateException extends HttpException {
  // eslint-disable-next-line
  constructor(data: VldItem, message?: string) {
    super(ExceptionType.VALIDATE, 400, message, data);
  }
}
