import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PersonGuard } from './person/person.guard';
import { TimeoutInterceptor } from './timeout.interceptor';
import { MyExceptionFilter } from './my-exception.filter';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PersonGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: ParseIntPipe,
    // },
    {
      provide: APP_FILTER,
      useClass: MyExceptionFilter,
    },
  ],
})
export class AppModule {}
