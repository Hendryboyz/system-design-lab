import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as users from './builtin-user.json';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private logger = new Logger(this.constructor.name);
  private builtinUsers: Map<string, User> = new Map();
  constructor() {
    this.logger.debug(JSON.stringify(users));
    users.forEach((user) => {
      this.builtinUsers.set(user.id, user);
    });
  }

  getUser(userId: string): User {
    if (!this.builtinUsers.has(userId)) {
      return null;
    }
    return this.builtinUsers.get(userId);
  }
}
