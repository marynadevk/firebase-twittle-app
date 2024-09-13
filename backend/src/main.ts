import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: configService.get('ORIGIN_HOST'),
    credentials: true,
  });
  await app.listen(configService.get('APP_PORT') || 3001);
}
bootstrap();
