import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PutTimestampMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    req.headers['X-DSEBD-TIMESTAMP'] = (new Date().getTime()).toString();
    this.logger.debug(req.headers);
    next();
  }
}
