import { Request } from 'express';

export interface LogOptions {
  json?: boolean;
  req?: Request;

  // eslint-disable-next-line
  jwtPayload?: any;
}
