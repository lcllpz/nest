import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject()
  private reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const isLoginRequired = this.reflector.getAllAndOverride('loginRequired', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!isLoginRequired) {
      return true;
    }

    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('请先登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      console.log(data);
      // 把数据绑定到request上，到时候controller上面可以直接通过request获取相关数据
      (request as any).user = data.user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('token失效，请重新登录 ---' + e.message);
    }
    return true;
  }
}
