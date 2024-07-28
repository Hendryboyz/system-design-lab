import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo } from './entities/todo.entities';
import { UserModule } from '../user/user.module';
import { PutHeadersMiddleware } from '../middlewares/put-headers.middleware';
import { RemoveQueryMiddleware } from '../middlewares/remove-query.middleware';
import { HeaderVerificationMiddleware } from '../middlewares/header-verification.middleware ';
import { DeleteAgentMiddleware } from '../middlewares/delete-agent.middleware';
import { RefererVerificationMiddleware } from '../middlewares/referer-verification.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule],
  providers: [TodoService],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule implements NestModule {
  private readonly todoBasicRoute = '*/users/*/todo*';
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RefererVerificationMiddleware,
        PutHeadersMiddleware,
      )
      .forRoutes(
        {
          path: this.todoBasicRoute, method: RequestMethod.GET,
        },
      );
    consumer
      .apply(
        RemoveQueryMiddleware,
        HeaderVerificationMiddleware,
      )
      .forRoutes(
        {
          path: this.todoBasicRoute, method: RequestMethod.PUT,
        },
        {
          path: this.todoBasicRoute, method: RequestMethod.POST,
        },
        {
          path: this.todoBasicRoute, method: RequestMethod.PATCH,
        },
      );
    consumer
      .apply(DeleteAgentMiddleware)
      .forRoutes(
        {
          path: this.todoBasicRoute, method: RequestMethod.DELETE,
        },
      );
  }
}
