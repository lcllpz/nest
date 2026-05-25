import { Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  @Inject('car')
  private car: { brand: string; price: number };

  @Inject('random')
  private random: number;

  // constructor(private readonly appService: AppService) {}
  @Inject(AppService)
  private appService: AppService;

  @Get('list')
  getAdminList() {
    return this.appService.getAdminList();
  }

  @Get('hello1')
  getHello1(): string {
    return (
      this.appService.getHello() +
      '---' +
      this.car.brand +
      '---' +
      this.car.price +
      '---' +
      this.random
    );
  }

  @Get('random')
  getRandom() {
    return this.random;
  }

  @Post('hello2')
  getHello2() {
    return 'hello2';
  }

  @Post('hello3')
  getHello3() {
    return {
      id: 1,
      name: 'jack',
      age: 19,
    };
  }
  @Get('car')
  getCar(): string {
    return `Hello, I have a ${this.car.brand} car, it's price is ${this.car.price}`;
  }
}
