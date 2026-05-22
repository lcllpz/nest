import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async initData() {
    const user1 = new User();
    user1.username = 'jack';
    user1.password = '123456';

    const user2 = new User();
    user2.username = 'rose';
    user2.password = '123456';

    const user3 = new User();
    user3.username = 'tom';
    user3.password = '123456';

    const role1 = new Role();
    role1.name = '超级管理员';

    const role2 = new Role();
    role2.name = '员工管理员';

    const role3 = new Role();
    role3.name = '部门管理员';

    const permission1 = new Permission();
    permission1.name = '新增 员工';
    const permission2 = new Permission();
    permission2.name = '更新 员工';
    const permission3 = new Permission();
    permission3.name = '删除 员工';
    const permission4 = new Permission();
    permission4.name = '查询 员工';

    const permission5 = new Permission();
    permission5.name = '新增 部门';
    const permission6 = new Permission();
    permission6.name = '更新 部门';
    const permission7 = new Permission();
    permission7.name = '删除 部门';
    const permission8 = new Permission();
    permission8.name = '查询 部门';

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ];

    role2.permissions = [permission1, permission2, permission3, permission4];
    role3.permissions = [permission5, permission6, permission7, permission8];

    user1.roles = [role1];
    user2.roles = [role2];
    user3.roles = [role3];

    await this.entityManager.save(Permission, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);

    await this.entityManager.save(Role, [role1, role2, role3]);
    await this.entityManager.save(User, [user1, user2, user3]);
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user;
  }
}
