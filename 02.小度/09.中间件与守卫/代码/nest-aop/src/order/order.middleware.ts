import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { OrderService } from './order.service';

@Injectable()
export class OrderMiddleware implements NestMiddleware {
  @Inject(OrderService)
  private orderService: OrderService;

  use(req: Request, res: Response, next: NextFunction) {
    console.log('before order 中间件 ---' + req.url);
    // 中间件支持 DI：由 Nest IoC 容器注入 OrderService，可直接调用业务方法
    console.log('调用注入的服务 order --- ' + this.orderService.findAll());
    next();
    console.log('after order 中间件 ---' + res.statusCode);
  }
}
