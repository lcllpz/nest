import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonMiddleware } from './person.middleware';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PersonMiddleware).forRoutes({
      path: '/person',
      method: RequestMethod.GET,
    });
  }
}
