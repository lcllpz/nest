import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject('user_service')
  private userService: UserService;

  // constructor(private readonly userService: UserService) {}

  @Get('list')
  getUserList() {
    return this.userService.getUserList();
  }
}
