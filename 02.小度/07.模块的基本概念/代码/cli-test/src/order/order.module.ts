import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  // UserModule 已声明为全局模块，无需重复 imports
  // imports: [UserModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
