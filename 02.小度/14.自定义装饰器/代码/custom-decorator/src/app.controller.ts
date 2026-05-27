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
import { MySetCombinedDecorator, MySetGetHeaders, MySetGetUser, MySetUser } from './myu-custom.decorator';

@Controller()
// @MyController('', 'app-controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

   

  // @Get()
  // @MySetUser('admin', 'user')
  // @UseGuards(CustomGuard)
  @MySetCombinedDecorator('', 'admin', 'user')
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('hello2')
  getHello2(@MySetGetUser('name') name: string): string {
    return `hello2-${name}`;
  }

  @Get('hello3')
  getHello3(
    @MySetGetHeaders('host') header1: string,
    @Headers('host') header2: string,
  ): string {
    console.log(header1, header2);
    return this.appService.getHello();
  }

  // @Get('hello4')
  // getHello4(@MyQuery('name') name: string, @Query('age') age: number): string {
  //   console.log(name, age);
  //   return this.appService.getHello();
  // }

  // @Get('hello5/:username')
  // getHello5(
  //   @MyParam('username') username1: string,
  //   @Param('username') username2: string,
  // ): string {
  //   console.log(username1, username2);
  //   return this.appService.getHello();
  // }
}
