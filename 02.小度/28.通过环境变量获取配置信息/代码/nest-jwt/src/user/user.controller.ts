import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginGuard } from 'src/login.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  @Inject()
  private jwtService: JwtService;

  @Inject()
  private authService: AuthService;

  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('loginPassport')
  async loginPassport(@Req() req) {
    return this.authService.login(req.user);
  }

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
        data: result,
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
  // @UseGuards(LoginGuard)
  @UseGuards(AuthGuard('jwt'))
  getUserInfo() {
    return '获取用户详细信息';
  }

  @Get('list')
  @UseGuards(LoginGuard)
  getUserList() {
    return '获取用户列表';
  }
}
