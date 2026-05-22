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

//1.用户所具有的角色，拥有哪些权限
//2.具体的路由方法上具有什么权限才能访问
//3.判断用户拥有的权限和路由权限是否匹配

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
