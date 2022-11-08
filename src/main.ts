import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import config from './config';
console.log(config.DATABASE_URL);
async function bootstrap() {
  console.log(config.DATABASE_URL);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  await app.listen(config.PORT, '0.0.0.0');
}
bootstrap();
