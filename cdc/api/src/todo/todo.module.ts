import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
