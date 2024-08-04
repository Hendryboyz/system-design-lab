import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RemoveQueryMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(`Remove all queries to [${req.method}] ${req.path}`);
    req.query = {};
    next();
  }
}
