import { Injectable } from "@nestjs/common";
import { TodoService } from "../../../todo/todo.service";
import { Command, CommandFactory } from "../command.factory";
import { CreateTodoCommand } from "./create-todo.command";
import { UpdateTodoCommand } from "./update-todo.command";
import { DeleteTodoCommand } from "./delete-todo.command";

@Injectable()
export class TodoCommandFactory extends CommandFactory {
  constructor(
    private readonly todoService: TodoService,
  ) {
    super();
  }
  getCreateCommand(): Command {
    return new CreateTodoCommand(this.todoService);
  }
  getUpdateCommand(): Command {
    return new UpdateTodoCommand(this.todoService);
  }
  getDeleteCommand(): Command {
    return new DeleteTodoCommand(this.todoService);
  }
  
}