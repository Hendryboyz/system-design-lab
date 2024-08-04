import { Logger } from '@nestjs/common';
import { TodoService } from '../../../todo/todo.service';
import { Command } from '../command.factory';

export class CreateTodoCommand implements Command {
  private logger = new Logger(this.constructor.name);
  constructor(private readonly todoService: TodoService) {}
  async execute(payload: any): Promise<void> {
    this.logger.debug(`Create todo item: `, JSON.stringify(payload));
    const { after } = payload;
    await this.todoService.upsert({
      itemId: after.todo_id,
      userId: after.user_id,
      content: after.content,
      createdAt: new Date(after.created_at / 1000),
      updatedAt: new Date(after.updated_at / 1000),
    });
  }
}
