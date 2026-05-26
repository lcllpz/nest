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
      // 指定传输协议
    const ctx = host.switchToHttp();
     // 获取响应对象(注意这里的Response是express的Response)
    const response = ctx.getResponse<Response>();
       // 获取请求对象(注意这里的Request是express的Request)
    const request = ctx.getRequest<Request>();
    // 获取状态码
    const status = exception.getStatus();
     // 获取异常信息
    const message = exception.message;
    // 获取异常响应体
    let resMessage: string | Record<string, any> = exception.getResponse();
    console.log('---MyExceptionFilter---');

    if (resMessage instanceof Object) {
      resMessage = resMessage['message'];
    } 

    response.status(status).json({   // 获取响应对象(注意这里的Response是express的Response)
      statusCode: status,
      message: message || resMessage,
      path: request.url,
      success: false,
    });
  }
}
