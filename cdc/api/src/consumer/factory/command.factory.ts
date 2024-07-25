import { Logger } from "@nestjs/common";

export interface Command {
  execute(payload: any): void | Promise<void>;
}

export abstract class CommandFactory {
  private logger = new Logger(this.constructor.name);
  constructor() {}

  parseCommand(operation: string): Command {
    this.logger.debug(operation);
    switch(operation) {
      case 'c':
        return this.getCreateCommand();
      case 'u':
        return this.getUpdateCommand();
    }
    return;
  }
  abstract getCreateCommand(): Command;
  abstract getUpdateCommand(): Command;
  abstract getDeleteCommand(): Command;
}


