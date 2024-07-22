import { Injectable, NotImplementedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entities';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class TodoService {
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
    this.userService.getUser(userId);
  }

  async listAll(userId: string): Promise<Todo[]> {
    this.verifyUser(userId);
    return await this.todoRepository.find({
      where: {
        userId
      }
    });
  }

  async findItem(userId: string, itemId: string): Promise<Todo> {
    this.verifyUser(userId);
    return await this.todoRepository.findOne({
      where: {
        userId,
        todoId: itemId,
      }
    });
  }

  update(userId: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    this.verifyUser(userId);
    throw new NotImplementedException();
  }

  async remove(userId: string, itemId: string): Promise<number> {
    this.verifyUser(userId);
    const result = await this.todoRepository.delete({
      userId: userId,
      todoId: itemId,
    });
    return result.affected;
  }
}
