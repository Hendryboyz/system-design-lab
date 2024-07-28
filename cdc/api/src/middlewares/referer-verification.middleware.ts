import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RefererVerificationMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    this.logger.debug(headers);
    if (!headers['referer'] || headers['referer'] !== 'www.svc.deltaww-energy.com') {
      throw new ForbiddenException(`No permission referer: ${headers['referer']}`);
    }
    next();
  }
}
