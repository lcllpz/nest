import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import { LclModule } from './lcl/lcl.module';
import { Lcl1Module } from './lcl1/lcl1.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [UserModule, PersonModule, LclModule, Lcl1Module],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
