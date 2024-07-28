import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class GetAssetsMiddle implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  use(req: Request, res: Response, _: NextFunction) {
    this.logger.debug(JSON.stringify(req.path), JSON.stringify(req.route));
    res.redirect(`/dsebd/api/static/assets`);
  }
}