import {
  Controller,
  Get,
  Inject,
  Req,
  Res,
  Session,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller()
export class AppController {
  @Inject()
  private jwtService: JwtService;

  constructor(private readonly appService: AppService) {}

  @Get('jwt1')
  getJwt1(@Res({ passthrough: true }) res: Response) {
    const token = this.jwtService.sign({ count: 1 });
    res.setHeader('Authorization', `Bearer ${token}`);
    return 'hello jwt1';
  }

  @Get('jwt2')
  getJwt2(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(authorization);
    if (authorization) {
      try {
        const token = authorization.split(' ')[1];
        const payload = this.jwtService.verify(token);
        const newToken = this.jwtService.sign({ count: payload.count + 1 });
        res.setHeader('Authorization', `Bearer ${newToken}`);
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }

    return 'hello jwt2';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('session1')
  getSession1(@Session() session: Record<string, any>): string {
    console.log(session);
    session.views = session.views ? session.views + 1 : 1;
    return session.views;
  }

  @Get('session2')
  getSession2(@Req() req: Request) {
    // 通过Request获取session、设置
    const session = req.session;
    console.log(session);
    session.views = session.views ? session.views + 1 : 1;
    return session.views;
  }
}
