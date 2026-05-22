import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  // 根据用户名查找用户
  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({
      username,
    });
    return user;
  }

  async login(user: LoginUserDto) {
    const loginUser = await this.findOneByUsername(user.username);
    if (!loginUser) {
      throw new HttpException('用户不存在', 400);
    }
    if (loginUser.password !== md5(user.password)) {
      throw new HttpException('密码错误', 400);
    }

    return loginUser;
  }

  async register(user: RegisterUserDto) {
    // 注册的时候首先查询用户名是否已经存在
    const userEntity = await this.userRepository.findOneBy({
      username: user.username,
    });
    if (userEntity) {
      throw new HttpException('用户名已存在', 200);
    }

    const newUser = new User();
    newUser.username = user.username;
    newUser.password = md5(user.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      console.log(e, '注册失败');
      return '注册失败';
    }
  }
}
