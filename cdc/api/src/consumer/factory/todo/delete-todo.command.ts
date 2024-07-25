import { Logger } from "@nestjs/common";
import { TodoService } from "../../../todo/todo.service";
import { Command } from "../command.factory";

export class DeleteTodoCommand implements Command {
  private logger = new Logger(this.constructor.name);
  constructor(private readonly todoService: TodoService) {}
  execute(payload: any): void {
    this.logger.debug(`Delete todo item: `, JSON.stringify(payload));
  }
}