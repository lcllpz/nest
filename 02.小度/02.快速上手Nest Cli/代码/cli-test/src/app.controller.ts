import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Get('list')
  getAdminList() { 
    return this.appService.getAdminList();
  }

  @Get('hello1')
  getHello1(): string {
    return this.appService.getHello();
  }

  @Post('hello2')
  getHello2() {
    return 'hello2';
  }

  @Post('hello3')
  getHello3() {
    return {
      id: 1,
      name: 'jack',
      age: 19,
    };
  }
}
