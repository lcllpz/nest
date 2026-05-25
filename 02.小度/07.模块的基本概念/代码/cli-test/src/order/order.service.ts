import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  @Inject(UserService)
  private userService: UserService;

  findAll() {
    return this.userService.findAll();
  }

  findOne(id: number) {
    console.log('---' + this.userService.findOne(id) + '---');
    return `This action returns a #${id} order`;
  }
}
