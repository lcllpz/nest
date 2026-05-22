import { Inject, Injectable, Logger } from '@nestjs/common';
import { MyLogger } from './logger/MyLogger';

@Injectable()
export class AppService {
  // private logger = new Logger(AppService.name);

  @Inject(MyLogger)
  private logger: MyLogger;

  getHello(): string {
    this.logger.info('getHello info!', AppService.name);
    this.logger.warn('getHello warn!', AppService.name);
    this.logger.error('getHello error!', AppService.name);
    return 'Hello World!';
  }
}
