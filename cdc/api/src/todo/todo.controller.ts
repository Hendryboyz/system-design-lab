import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todo')
@Controller({path: 'users/:userId/todo', version: '1'})
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodoItem(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  listTodo() {
    return this.todoService.findAll();
  }

  @Get(':itemId')
  getTodoItem(@Param('itemId') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':itemId')
  update(@Param('itemId') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':itemId')
  remove(@Param('itemId') id: string) {
    return this.todoService.remove(+id);
  }
}
