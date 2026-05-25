import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `查询id=${id}的用户`;
  }
}
