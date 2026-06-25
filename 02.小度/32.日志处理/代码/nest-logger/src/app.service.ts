import { Inject, Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class AppService {
  // private logger = new Logger(AppService.name);

  @Inject(MyLogger)
  private logger: MyLogger;

  getHello(): string {
    // 1.手动日志
    // this.logger.error('getHello error!');
    // this.logger.log('getHello log!');
    // 2. 利用winston记录日志
    this.logger.info('getHello info!', AppService.name);
    this.logger.warn('getHello warn!', AppService.name);
    this.logger.error('getHello error!', AppService.name);
    return 'Hello World!';
  }
}
