import { Logger } from "@nestjs/common";
import { TodoService } from "../../../todo/todo.service";
import { Command } from "../command.factory";

export class UpdateTodoCommand implements Command {
  private logger = new Logger(this.constructor.name);
  constructor(private readonly todoService: TodoService) {}
  execute(payload: any): void {
    this.logger.debug(`Patch todo item: `, JSON.stringify(payload));
  }
}