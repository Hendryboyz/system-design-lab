import { Injectable } from '@nestjs/common';
import { TodoCommandFactory } from './todo/todo-command.factory';
import { CommandFactory } from './command.factory';

type CdcSource = {
  version: string;
  connector: string;
  name: string;
  ts_ms: number;
  snapshot: string;
  db: string;
  sequence: (null | string)[];
  schema: string;
  table: string;
  txId: number;
  lsn: number;
  xmin: null;
};

@Injectable()
export class CommandFactoryProvider {
  constructor(private readonly todoFactory: TodoCommandFactory) {}

  parseFactory(source: CdcSource): CommandFactory {
    switch (source.table) {
      case 'todo':
        return this.todoFactory;
    }
  }
}
