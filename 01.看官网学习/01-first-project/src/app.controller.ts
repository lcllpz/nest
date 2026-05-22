import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';

export class CreateUserDto {
  name: string;
  age: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('car/:id')
  // getCar(@Body() body): string {
  // getCar(@Query() query): string {
  //   console.log(query);
  // getCar(@Param() param): string {
  //   console.log(param);
  getCar(@Headers() header): string {
    console.log(header);
    return this.appService.getCar();
  }
  @Post('/car/add')
  getCaradd(): string {
    return 'getCaradd';
  }

  @Get('files/*path')
  getFile(@Param('path') path: string[]) {
    return path;
  }

  // 重定向
  @Get('go')
  @Redirect('https://www.baidu.com/', 302)
  redirect() {
    return {
      url: 'https://www.bilibili.com/',
      statusCode: 302,
    };
  }

  // 🔴 302：可能改变方法
  @Post('test-302')
  @Redirect('/target', 302)
  test302(@Body() body) {
    console.log('👉 进入 test-302，方法是 POST，body:', body);
  }

  // 🟢 307：不会改变方法
  @Post('test-307')
  @Redirect('/target', 307)
  test307(@Body() body) {
    console.log('👉 进入 test-307，方法是 POST，body:', body);
  }

  // 🎯 最终接收请求的接口
  @Get('target')
  getTarget(@Req() req) {
    console.log('🎯 最终到达 target（GET）');
    return {
      method: 'GET',
      message: '你被重定向成 GET 了',
    };
  }

  @Post('target')
  postTarget(@Req() req, @Body() body) {
    console.log('🎯 最终到达 target（POST），body:', body);
    return {
      method: 'POST',
      body,
    };
  }

  // Request payloads
  @Post('adduser')
  createUser(@Body() dto: CreateUserDto) {
    console.log('dto->', dto);
    return {
      ...dto,
    };
  }

  // ## Query parameters
  // @Get('cats')
  // async findAll(
  //   @Query('age') age: number,
  //   @Query('breed') breed: string,
  //   @Query() query: any,
  // ) {
  //   console.log(query);

  //   return `This action returns all cats filtered by age: ${age} and breed: ${breed}`;
  // }

  // Library-specific approach#
  @Get('cats')
  findAll(@Res() response: Response) {
    // 你可以使用响应对象来自定义响应
    return response
      .status(401)
      .json({ message: 'This is the custom response handling with @Res()' });
  }
}
