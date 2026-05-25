import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

// 1.构造器注入
  constructor(private readonly userService: UserService) {
  }
  // 2.属性注入
  // @Inject('user_service')
  // private userService: UserService;


  @Get('list')
  getUserList() {
    return this.userService.getUserList();
  }
}
