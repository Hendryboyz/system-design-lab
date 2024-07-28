import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LimitHostMiddleware implements NestMiddleware {
  private hostVerification: boolean;
  constructor(private readonly config: ConfigService) {
    this.hostVerification = this.config.get<boolean>('app.hostVerification');
  }
  use(req: Request, res: Response, next: NextFunction) {
    const { hostname } = req;
    if (this.hostVerification && hostname !== 'www.deltaww-energy.com') {
      throw new ForbiddenException(`Deny access from: ${hostname}`);
    }
    next();
  }
}
