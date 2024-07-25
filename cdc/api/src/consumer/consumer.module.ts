import { Logger, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqp-connection-manager';
import { CaptureDataChangeConsumer } from './cdc.consumer';
import { CommandFactoryProvider } from './factory/command-factory.provider';
import { TodoCommandFactory } from './factory/todo/todo-command.factory';
import { TodoModule } from '../todo/todo.module';
import { PROVIDERS } from '../constants';

const connectionManagerFactory: Provider = {
  provide: PROVIDERS.AMQP_CONNECTION_MANAGER,
  useFactory: (config: ConfigService) => {
    const logger = new Logger(PROVIDERS.AMQP_CONNECTION_MANAGER);
    const amqpConfig = {
      hostname: config.get<string>('queue.hostname'),
      username: config.get<string>('queue.username'),
      password: config.get<string>('queue.password'),
      port: config.get<number>('queue.port'),
    };
    const amqpUrl = `amqp://${amqpConfig.username}:${amqpConfig.password}@${amqpConfig.hostname}:${amqpConfig.port}`;
    const connection = amqp
      .connect([amqpUrl])
      .prependListener('connectFailed', (arg) => {
        logger.error('[AMQP] connect failed', arg);
      });
    connection.on('connect', () => console.log('Connection created!'));
    connection.on('disconnect', (err) => {
      logger.error('Disconnected.', err.err.stack);
    });
    return connection;
  },
  inject: [ConfigService],
};

@Module({
  imports: [TodoModule],
  providers: [
    connectionManagerFactory,
    CaptureDataChangeConsumer,
    CommandFactoryProvider,
    TodoCommandFactory,
  ],
})
export class ConsumerModule {}
