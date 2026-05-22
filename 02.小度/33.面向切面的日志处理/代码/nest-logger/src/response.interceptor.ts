import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { MyLogger } from './logger/MyLogger';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  @Inject(MyLogger)
  private logger: MyLogger;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        const logFormat = `
        ################################################
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        Response Data: ${JSON.stringify(data)}
        ################################################
        `;
        this.logger.log(logFormat, 'Response LoggerInterceptor');
        return data;
      }),
    );
  }
}
