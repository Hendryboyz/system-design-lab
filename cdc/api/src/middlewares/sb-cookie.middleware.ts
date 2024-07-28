import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SbCookieMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(req.cookies);
    res.send
    next();
  }
}