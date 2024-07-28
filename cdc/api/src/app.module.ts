import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { ConsumerModule } from './consumer/consumer.module';
import { PutTimestampMiddleware } from './middlewares/put-timestamp.middleware';
import { LimitHostMiddleware } from './middlewares/limit-host.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['configs/.env'],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          entities: [],
          ...config.get('database'),
        };
      },
      inject: [ConfigService],
    }),
    TodoModule,
    UserModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PutTimestampMiddleware)
      .forRoutes(
        {
          path: '*',
          method: RequestMethod.ALL,
        },
      );
    consumer
      .apply(LimitHostMiddleware)
      .forRoutes(
        {
          path: '*',
          method: RequestMethod.ALL,
        },
      );
  }
}
