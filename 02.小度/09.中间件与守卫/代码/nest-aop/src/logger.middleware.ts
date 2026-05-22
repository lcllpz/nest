import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('before 全局中间件 --- ' + req.url);
    next();
    console.log('after 全局中间件 --- ' + res.statusCode);
  }
}
