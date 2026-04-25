import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getCar(): string {
    return '<h1>Hello World car!</h1>';
  }
}
