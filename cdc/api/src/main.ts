import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { CaptureDataChangeConsumer } from './consumer/cdc.consumer';

const logger = new Logger('main');

function enableSwagger(app: INestApplication, config: ConfigService) {
  const docBuilder = new DocumentBuilder()
    .setTitle('API Backend')
    .setDescription('API description');

  const openAPIBasename = config.get<string>('api.openAPI.basename');
  if (openAPIBasename) {
    docBuilder.addServer(openAPIBasename);
  }

  const document = SwaggerModule.createDocument(app, docBuilder.build());

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const domainPrefix = configService.get<string>('app.domainPrefix');
  app.setGlobalPrefix(`${domainPrefix ? domainPrefix + '/' : ''}api`);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableShutdownHooks();
  app.useLogger(
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  );
  app.use(cookieParser());

  const enableOpenAPI = configService.get<boolean>('app.openAPI.enable');
  if (enableOpenAPI) {
    enableSwagger(app, configService);
  }

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  const appPort = configService.get<number>('app.port');
  await app.listen(appPort, () => {
    logger.log(`Application started at port: ${appPort}`);
  });

  const consumer = app.get(CaptureDataChangeConsumer);
  await consumer.start();
}
bootstrap();
