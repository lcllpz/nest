import {   Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
 

  findAll() {
    return `findAll`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
