import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SbCookieMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader || !cookieHeader.includes('sbcookie')) {
      throw new ForbiddenException(`Need sbcookie to access: ${req.path}`);
    }
    const isValidSbCookie = req.cookies['sbcookie'] === 'hello';
    if (!isValidSbCookie) {
      // do something
    }
    this.logger.debug(req.cookies);
    next();
  }
}