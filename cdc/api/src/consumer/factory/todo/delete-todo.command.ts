import { Logger } from '@nestjs/common';
import { TodoService } from '../../../todo/todo.service';
import { Command } from '../command.factory';

export class DeleteTodoCommand implements Command {
  private logger = new Logger(this.constructor.name);
  constructor(private readonly todoService: TodoService) {}
  async execute(payload: any): Promise<void> {
    this.logger.debug(`Delete todo item: `, JSON.stringify(payload));
    const { before } = payload;
    await this.todoService.removeById(before.todo_id);
  }
}
