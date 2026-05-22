import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  @Inject(MyLogger)
  private logger: MyLogger;
  use(req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode;
    const logFormat = `
    ################################################
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${statusCode}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)}
    ################################################
    `;
    next();

    if (statusCode >= 500) {
      this.logger.error(logFormat, 'Request LoggerMiddleware');
    } else if (statusCode >= 400) {
      this.logger.warn(logFormat, 'Request LoggerMiddleware');
    } else {
      this.logger.log(logFormat, 'Request LoggerMiddleware');
    }
  }
}
