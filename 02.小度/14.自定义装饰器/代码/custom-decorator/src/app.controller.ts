import {
  Controller,
  Get,
  UseGuards,
  Headers,
  Query,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  GetUser,
  MyCombinedDecorator,
  MyController,
  MyHeaders,
  MyParam,
  MyQuery,
  SetUser,
} from './custom.decorator';
import { CustomGuard } from './custom.guard';

// @Controller()
@MyController('', 'app-controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetUser('admin', 'user')
  @UseGuards(CustomGuard)
  // @MyCombinedDecorator('hello1', 'admin', 'user')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(@GetUser('name') u: string): string {
    console.log(u);
    return this.appService.getHello();
  }

  @Get('hello3')
  getHello3(
    @MyHeaders('host') header1: string,
    @Headers('host') header2: string,
  ): string {
    console.log(header1, header2);
    return this.appService.getHello();
  }

  @Get('hello4')
  getHello4(@MyQuery('name') name: string, @Query('age') age: number): string {
    console.log(name, age);
    return this.appService.getHello();
  }

  @Get('hello5/:username')
  getHello5(
    @MyParam('username') username1: string,
    @Param('username') username2: string,
  ): string {
    console.log(username1, username2);
    return this.appService.getHello();
  }
}
