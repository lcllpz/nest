import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './user/entities/permission.entity';
import { UserService } from './user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(UserService)
  private userService: UserService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return true;
    }
    console.log('roles---', user.roles);
    const roles = await this.userService.findRoleByIds(
      user.roles.map((item) => item.id),
    );

    const permissions: Permission[] = roles.reduce((acc, cur) => {
      acc.push(...cur.permissions);
      return acc;
    }, []);

    console.log('拥有的权限---', permissions);

    const permissionRequired = this.reflector.getAllAndOverride(
      'permissionRequired',
      [context.getClass(), context.getHandler()],
    );

    console.log('路由权限---', permissionRequired);

    // 如果没有路由权限，直接放行
    if (!permissionRequired) {
      return true;
    }

    // 如果拥有路由权限，和用户权限依次比对
    for (let i = 0; i < permissionRequired.length; i++) {
      const curPermission = permissionRequired[i];
      const found = permissions.find((item) => item.name === curPermission);
      console.log('found---', found);
      if (!found) {
        throw new UnauthorizedException('该接口你没有访问的权限');
      }
    }

    return true;
  }
}
