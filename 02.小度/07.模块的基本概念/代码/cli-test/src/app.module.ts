import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

// 按需加载：只有 ENABLE_ADMIN=true 时才注册 AdminModule
const conditionalModules =
  process.env.ENABLE_ADMIN === 'true' ? [AdminModule] : [];

// 条件配置：根据环境传入不同的 Auth 模块参数
const authOptions =
  process.env.NODE_ENV === 'production'
    ? { role: 'guest', type: 'auth' }
    : { role: 'admin', type: 'auth' };

@Module({
  imports: [
    UserModule,
    OrderModule,
    AuthModule.register(authOptions),
    ...conditionalModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
