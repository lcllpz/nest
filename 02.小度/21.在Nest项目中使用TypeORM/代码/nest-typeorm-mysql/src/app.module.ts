import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'learn',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // 生产环境不要开启这个选项：默认不会自动建表
      synchronize: true,
      logging: true,
      // 让这条连接上的读写统一按 UTC，减少「存一种、读又变一种」的偏差。
      // 让 Nest ↔ MySQL 之间的日期时间按 UTC 处理，避免 Docker/本地 MySQL 时区没配好时，出现东八区差 8 小时的问题。
      timezone: 'Z',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
