import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    let resMessage: string | Record<string, any> = exception.getResponse();
    console.log('---MyExceptionFilter---');

    if (resMessage instanceof Object) {
      resMessage = resMessage['message'];
    }

    response.status(status).json({
      statusCode: status,
      message: message || resMessage,
      path: request.url,
      success: false,
    });
  }
}
