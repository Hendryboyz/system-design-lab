import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@ApiTags('Todo')
@Controller({ path: 'users/:userId/todo', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date Type Error',
  })
  async createTodoItem(
    @Param('userId') userId: string,
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return await this.todoService.create(userId, createTodoDto);
  }

  @Get()
  listTodo(@Param('userId') userId: string) {
    return this.todoService.listAll(userId);
  }

  @Get(':itemId')
  getTodoItem(@Param('userId') userId: string, @Param('itemId') id: string) {
    return this.todoService.findItem(userId, id);
  }

  @Patch()
  update(
    @Param('userId') userId: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(userId, updateTodoDto);
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('userId') userId: string, @Param('itemId') id: string) {
    await this.todoService.remove(userId, id);
  }
}
