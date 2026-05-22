import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAdminList() {
    const adminList: Admin[] = [
      new Admin('1', 'jack', '123456'),
      new Admin('2', 'rose', '123456'),
    ];
    return adminList;
  }
}
