import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
// import { APP_GUARD } from '@nestjs/core';
import { OrderModule } from './order/order.module';
// import { PersonGuard } from './person/person.guard';

@Module({
  imports: [PersonModule, OrderModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: PersonGuard,
    // },
  ],
})
export class AppModule {}
