import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { PersonGuard } from './person/person.guard';
import { TimeoutInterceptor } from './timeout.interceptor';
import { GlInterceptor } from './gl.interceptor';

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
    {
      provide: APP_INTERCEPTOR,
      useClass: GlInterceptor,
    },
  ],
})
export class AppModule {}
