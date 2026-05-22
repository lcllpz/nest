import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as md5 from 'md5';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  @Inject(UserService)
  private userService: UserService;

  @Inject(JwtService)
  private jwtService: JwtService;

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === md5(password)) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
