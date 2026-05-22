import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'user_service',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
