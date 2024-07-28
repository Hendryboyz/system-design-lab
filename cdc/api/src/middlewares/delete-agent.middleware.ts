import { ForbiddenException, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DeleteAgentMiddleware implements NestMiddleware {
  private logger = new Logger(this.constructor.name);
  private allowDeleteAgents: string[];
  private enableDeleteAgentVerification: boolean;
  constructor(private readonly config: ConfigService) {
    this.enableDeleteAgentVerification = this.config.get<boolean>('app.enableDeleteAgentVerification');
    this.allowDeleteAgents = this.config.get<string[]>('app.allowDeleteAgents');
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(this.enableDeleteAgentVerification, this.allowDeleteAgents);
    this.logger.debug(req.headers);
    if (!this.enableDeleteAgentVerification) {
      this.logger.debug('Skip agent verification.');
      next();
    } else {
      this.verifyAgent(req);
      next();
    }
  }

  private verifyAgent(req: Request) {
    const { rawHeaders } = req;
    if (!rawHeaders.includes('X-DSEBD-AGENT')) {
      throw new ForbiddenException('Not provide agent');
    }
    const index = rawHeaders.indexOf('X-DSEBD-AGENT') + 1;
    const agent = rawHeaders[index];
    if (this.allowDeleteAgents && !this.allowDeleteAgents.includes(agent)) {
      throw new ForbiddenException(`Agent[${agent}] deny delete resources`);
    }
  }
}
