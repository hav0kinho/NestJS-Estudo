import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalInterceptors(new LogInterceptor()); -> Todos os controllers e requisições usam o LogInterceptor, dando log no tempo de execução e nos dados da request

  await app.listen(3000);
}
bootstrap();
