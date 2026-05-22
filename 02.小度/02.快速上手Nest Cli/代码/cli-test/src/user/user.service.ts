import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserList() {
    return [
      { id: 1, name: 'jack', age: 19 },
      { id: 2, name: 'rose', age: 17 },
    ];
  }
}
