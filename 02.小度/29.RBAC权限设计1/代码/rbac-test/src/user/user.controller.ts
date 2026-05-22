import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  @Inject(JwtService)
  private jwtService: JwtService;
  constructor(private readonly userService: UserService) {}
  @Get('init')
  async init() {
    await this.userService.initData();
    return '初始化成功';
  }

  @Post('login')
  async login(@Body(ValidationPipe) user: LoginUserDto) {
    const result = await this.userService.login(user);

    const token = this.jwtService.sign({
      user: {
        username: result.username,
        roles: result.roles,
      },
    });
    return { token };
  }
}
