import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'rbac_test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      connectorPackage: 'mysql2',
      timezone: 'Z',
    }),
    JwtModule.register({
      global: true,
      secret: 'MySecret',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule,
    EmployeeModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
