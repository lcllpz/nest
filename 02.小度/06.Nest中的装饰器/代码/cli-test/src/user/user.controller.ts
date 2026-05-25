import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Ip,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  @Inject('user_service')
  private userService: UserService;

  // constructor(private readonly userService: UserService) {}

  @Get('list')
  getUserList() {
    return this.userService.getUserList();
  }

  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    console.log(name, age);
    return this.userService.query(name, age);
  }

  @Post('add')
  add(@Body() user: CreateUserDto) {
    console.log(user);
    return this.userService.add(user);
  }

  @Get('other')
  other(
    @Ip() ip: string,
    @Headers('content-type') headers: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(ip);
    console.log(headers);
    console.log(req.url);

    res.end('other');
  }

  // 要放在最后，因为Nest是从上往下匹配的
  // 如果放在前面，就会先匹配到 :id 路由，然后就不会匹配到 findOne 方法
  // 所以 :id 路由要放在最后
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id====', id);
    return this.userService.findOne(+id);
  }
}
