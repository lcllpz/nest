import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    // 1.构造器注入
    // UserService,
    {
      provide: UserService,
      useClass: UserService,
    },
    // 2.属性注入
    // {
    //   provide: 'user_service',
    //   useClass: UserService,
    // },
  ],
})
export class UserModule {}
