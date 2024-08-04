import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqp-connection-manager';
import * as amqplib from 'amqplib';
import { CommandFactoryProvider } from './factory/command-factory.provider';
import { PROVIDERS } from '../constants';

@Injectable()
export class CaptureDataChangeConsumer
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private logger = new Logger(this.constructor.name);
  private channel: amqp.ChannelWrapper;
  constructor(
    private readonly config: ConfigService,
    @Inject(PROVIDERS.AMQP_CONNECTION_MANAGER)
    private readonly acm: amqp.AmqpConnectionManager,
    private readonly commandFactoryProvider: CommandFactoryProvider,
  ) {}

  onApplicationBootstrap() {}

  async start() {
    this.logger.log(`Capture data change consumer starting`);
    const cdcQueue = this.config.get<string>('cdc.queue');
    this.channel = this.acm.createChannel({
      setup: (ch: amqplib.ConfirmChannel) => {
        return Promise.all([
          ch.prefetch(1),
          // ch.assertExchange(cdcQueue, 'direct', { durable: true }),
          ch.assertQueue(cdcQueue, { durable: true }),
          ch.bindQueue(cdcQueue, cdcQueue, cdcQueue),
          ch.consume(cdcQueue, this.onMessage.bind(this)),
        ]);
      },
    });
    this.channel.on('connect', () => {
      this.logger.debug(`Channel[${this.channel.name}] connected`);
    });

    this.channel.on('error', (err, info) => {
      this.logger.error(
        `Channel[${this.channel.name}] error - ${info.name}: ${err}`,
      );
    });

    this.channel.on('close', () => {
      this.logger.warn(
        `Channel[${this.channel.name}] closed: clear all transription tasks`,
      );
    });
    await this.channel.waitForConnect();
  }

  private async onMessage(msg: amqplib.ConsumeMessage) {
    const change = this.parseMessage(msg);
    if (!change) {
      this.channel.ack(msg);
      return;
    }
    const { source, op } = change.payload;

    if (!source || !op) {
      this.channel.ack(msg);
      return;
    }

    this.logger.debug(source);
    const factory = this.commandFactoryProvider.parseFactory(source);
    const syncCommand = factory.parseCommand(op);
    if (!syncCommand) {
      this.channel.ack(msg);
      this.logger.warn(`No sync command to execute`, source);
      return;
    }
    await syncCommand.execute(change.payload);
    this.channel.ack(msg);
  }

  private parseMessage(msg: amqplib.ConsumeMessage) {
    const rawMessage = msg.content.toString();
    try {
      return JSON.parse(rawMessage);
    } catch (err) {
      this.logger.error(`JSON parse failed, msg: ${rawMessage}`);
      return undefined;
    }
  }

  onApplicationShutdown(signal?: string) {}
}
