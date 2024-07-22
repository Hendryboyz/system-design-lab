import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}