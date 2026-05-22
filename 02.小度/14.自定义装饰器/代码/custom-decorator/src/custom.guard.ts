import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomGuard implements CanActivate {
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const metaData = this.reflector.get('MyClass', context.getClass());
    console.log(metaData);

    const users = this.reflector.get('SetUser', context.getHandler());
    console.log(users);
    return true;
  }
}
