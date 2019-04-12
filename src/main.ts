import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { NODE_ENV } = process.env;

if (NODE_ENV) {
  // tslint:disable-next-line:no-console
  console.log(`\n ---------- "${NODE_ENV.toLocaleUpperCase()}" IN PROGRESS ---------- \n`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
