import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from './entities/user.entity';
import { LoginGuard } from 'src/login.guard';

@Controller('user')
export class UserController {
  @Inject()
  private jwtService: JwtService;

  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(
    @Body(ValidationPipe) user: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.userService.login(user);

    if (result) {
      const token = await this.jwtService.signAsync({
        user: {
          id: result.id,
          username: result.username,
        },
      });
      res.header('Authorization', token);

      return {
        message: '登录成功',
        data: {
          token: token,
          ...result
        },
        code: 200,
      };
    } else {
      return {
        message: '登录失败',
        code: 400,
        data: null,
      };
    }
  }

  @Post('register')
  async register(@Body(ValidationPipe) user: RegisterUserDto) {
    return await this.userService.register(user);
  }

  @Get('info')
  @UseGuards(LoginGuard)
  getUserInfo() {
    return '获取用户详细信息';
  }

  @Get('list')
  @UseGuards(LoginGuard)
  getUserList() {
    return '获取用户列表';
  }
}
