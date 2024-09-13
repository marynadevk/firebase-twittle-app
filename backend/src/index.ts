import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

const expressServer = express();

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: configService.get('ORIGIN_HOST'),
    credentials: true,
  });
  await app.init();
};

export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
