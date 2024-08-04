import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class PutHeadersMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    headers['from'] = 'hello@deltawww-engery.com';
    this.logger.debug(req.headers);
    next();
  }
}
