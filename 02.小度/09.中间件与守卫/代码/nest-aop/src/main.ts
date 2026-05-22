import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './logger.middleware';
// import { PersonGuard } from './person/person.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new LoggerMiddleware().use);
  // app.useGlobalGuards(new PersonGuard());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
