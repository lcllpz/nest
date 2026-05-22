import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  @Inject(MyLogger)
  private logger: MyLogger;

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const logFormat = `
    ################################################
    Request original url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    Status code: ${status}
    Response: ${exception.toString() + `(${exceptionResponse?.message || exceptionResponse})`}
    `;
    this.logger.error(logFormat, 'HttpExceptionFilter');

    response.status(status).json({
      code: status,
      timestamp: new Date().toLocaleString(),
      error: exceptionResponse?.message || exceptionResponse,
      msg: `${status >= 500 ? 'Server Error' : 'Client Error'}`,
    });
  }
}
