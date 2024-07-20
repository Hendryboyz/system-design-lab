import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('main');

function enableSwagger(app: INestApplication, config: ConfigService) {
  const docConfig = new DocumentBuilder()
    .setTitle('API Backend')
    .setDescription('API description')
    .addServer(config.get<string>('api.openAPI.basename'))
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);

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
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.enableShutdownHooks();
  app.useLogger(
    process.env.NODE_ENV === 'production'
      ? ['error', 'warn', 'log']
      : ['error', 'warn', 'log', 'debug', 'verbose'],
  );

  const enableOpenAPI = configService.get<boolean>('app.openAPI.enable');
  if (enableOpenAPI) {
    enableSwagger(app, configService);
  }

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  await app.listen(configService.get<number>('app.port'));
}
bootstrap();
