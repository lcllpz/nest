import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({})
export class AuthModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: AuthModule,
      controllers: [AuthController],
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        AuthService,
      ],
      exports: [],
    };
  }
}
