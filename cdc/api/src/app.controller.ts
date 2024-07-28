import { Controller, Get } from '@nestjs/common';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly user: UserService) {}

  @Get('/health')
  healthCheck(): boolean {
    return true;
  }

  @Get('/about/me')
  me(): any[] {
    return this.user.getAllUsers();
  }

  @Get('/resource')
  resource(): string {
    return '/resource';
  }

  @Get('/static/assets')
  staticAssets(): string {
    return '/static/assets';
  }
}
