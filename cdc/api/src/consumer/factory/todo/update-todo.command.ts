import { Logger } from '@nestjs/common';
import { TodoService } from '../../../todo/todo.service';
import { Command } from '../command.factory';

export class UpdateTodoCommand implements Command {
  private logger = new Logger(this.constructor.name);
  constructor(private readonly todoService: TodoService) {}
  async execute(payload: any): Promise<void> {
    this.logger.debug(`Patch todo item: `, JSON.stringify(payload));
    const { after } = payload;
    await this.todoService.update(after.userId, {
      itemId: after.todo_id,
      content: after.content,
    });
  }
}
