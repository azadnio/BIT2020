import { JwtPayload } from '@SharedRepo/interfaces/jwt-payload.interface';
import { Request } from 'express';

export type ExtendedRequest = Request & {
  user?: JwtPayload;
};
