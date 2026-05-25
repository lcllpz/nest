import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  findAll() {
    return 'Admin module is loaded';
  }
}
