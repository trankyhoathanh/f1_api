import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
};

bootstrap();
