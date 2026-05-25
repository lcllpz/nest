import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderMiddleware } from './order.middleware';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderMiddleware],
  exports: [OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OrderMiddleware).forRoutes({
      path: '/order',
      method: RequestMethod.GET,
    });
  }
}