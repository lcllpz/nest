import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHello2(@Query() name: string): string {
    console.log('name', name);
    throw new HttpException(
      'getHello2() 请求异常',
      HttpStatus.EXPECTATION_FAILED,
    );
    return 'Hello World2!';
  }
}
