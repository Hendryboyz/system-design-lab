import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entities';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(this.constructor.name);
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}

  create(userId: string, createTodoDto: CreateTodoDto) {
    this.verifyUser(userId);
    const newTodo = this.todoRepository.create({
      userId,
      content: createTodoDto.content,
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

  async findItem(userId: string, itemId: string): Promise<Todo> {
    this.verifyUser(userId);
    const targetItem = await this.todoRepository.findOne({
      where: {
        userId,
        todoId: itemId,
      },
    });
    if (!targetItem) {
      throw new NotFoundException(`Todo item[${itemId}] not found.`);
    }
    return targetItem;
  }

  async update(userId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const existedTodo = await this.findItem(userId, updateTodoDto.itemId);
    if (!existedTodo) {
      throw new NotFoundException(
        `Todo item[${updateTodoDto.itemId}] not found.`,
      );
    }
    existedTodo.content = updateTodoDto.content;
    return await this.todoRepository.save(existedTodo);
  }

  async remove(userId: string, itemId: string): Promise<void> {
    this.verifyUser(userId);
    const deletingItem = await this.findItem(userId, itemId);
    const deleted = await this.todoRepository.remove(deletingItem);
    this.logger.debug(JSON.stringify(deleted));
  }
}
