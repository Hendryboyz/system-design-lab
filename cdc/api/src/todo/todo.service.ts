import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entities';
import { CreateTodoDto, UpdateTodoDto, UpsertTodoDto } from './dto/todo.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  create(userId: string, dto: CreateTodoDto) {
    this.verifyUser(userId);
    const newTodo = this.todoRepository.create({
      userId,
      content: dto.content,
    });
    return this.todoRepository.save(newTodo);
  }

  verifyUser(userId: string) {
    const user = this.userService.getUser(userId);
    if (!user) {
      throw new NotFoundException(`User[${userId}] not found.`);
    }
  }

  async listAll(userId: string): Promise<Todo[]> {
    this.verifyUser(userId);
    return await this.todoRepository.find({
      where: {
        userId,
      },
    });
  }

  async findItem(itemId: string): Promise<Todo> {
    const targetItem = await this.todoRepository.findOne({
      where: {
        todoId: itemId,
      },
    });
    if (!targetItem) {
      throw new NotFoundException(`Todo item[${itemId}] not found.`);
    }
    return targetItem;
  }

  async update(userId: string, dto: UpdateTodoDto): Promise<Todo> {
    this.verifyUser(userId);
    const existedTodo = await this.findItem(dto.itemId);
    if (!existedTodo) {
      throw new NotFoundException(`Todo item[${dto.itemId}] not found.`);
    }
    existedTodo.content = dto.content;
    return await this.todoRepository.save(existedTodo);
  }

  async remove(userId: string, itemId: string): Promise<void> {
    this.verifyUser(userId);
    await this.removeById(itemId);
  }

  async removeById(itemId: string): Promise<void> {
    const deletingItem = await this.findItem(itemId);
    const deleted = await this.todoRepository.remove(deletingItem);
    this.logger.debug(JSON.stringify(deleted));
  }

  async upsert(dto: UpsertTodoDto) {
    const item = this.todoRepository.create({
      todoId: dto.itemId,
      ...dto,
    });
    this.logger.debug(JSON.stringify(item));
    await this.todoRepository.upsert(item, {
      conflictPaths: { todoId: true },
    });
  }
}
