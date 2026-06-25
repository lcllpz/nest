import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/MyLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn'],
    // bufferLogs: true,
    logger: false,
  });
  //  使用自定义Logger
  app.useLogger(app.get(MyLogger));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//[AppName] [PID] [TimeStamp] [LogLevel] [Context] message [+ms]
// log
// error
// warn
// debug
// verbose
// fatal

// 1、日志行为不应该出现异常
// 2、日志行为不应该影响应用程序的正常运行,不应该有副作用
// 3、日志不应该包含敏感信息
// 4、日志应该尽可能详细
