import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class HeaderVerificationMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    if (!req.rawHeaders.includes('X-DSEBD-AGENT')) {
      throw new ForbiddenException('Not provide agent');
    }
    if (!headers['content-type'] || headers['content-type'] !== 'application/json') {
      throw new ForbiddenException('Only support content-type: application/json');
    }
    next();
  }
}
