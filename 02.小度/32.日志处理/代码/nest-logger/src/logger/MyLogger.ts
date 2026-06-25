// 2. 使用winston记录日志
import { Injectable, LoggerService } from '@nestjs/common';
import 'winston-daily-rotate-file';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import {
  Logger as WinstonLogger,
  createLogger,
  format,
  transports,
} from 'winston';

@Injectable()
export class MyLogger implements LoggerService {
  private logger: WinstonLogger;
  constructor() {
    this.logger = createLogger({
      level: 'debug',
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            // 日志格式
            format.printf(({ context, level, message, timestamp }) => {
              const appStr = chalk.blue('[Nest]');
              const contextStr = chalk.yellow(`[${context}]`);
              return `${appStr} ${timestamp} ${level} ${contextStr} : ${message}`;
            }),
          ),
        }),
        new transports.DailyRotateFile({
          // 日志文件夹
          dirname: process.cwd() + '/src/logs',
          // 日志文件名,%DATE%会自动替换为当前日期
          filename: 'app-%DATE%.info.log',
          // 日志文件日期格式
          datePattern: 'YYYY-MM-DD',
          // 日志文件保留天数
          maxFiles: '7d',
          // 压缩文档
          zippedArchive: true,
          // 文件最大大小
          maxSize: '20M',
          // 日志格式
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
          ),
          // 日志等级，如果不设置，所有日志信息会保存在同一个文件中
          level: 'info',
        }),
        new transports.DailyRotateFile({
          dirname: process.cwd() + '/src/logs',
          filename: 'app-%DATE%.error.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '7d',
          zippedArchive: true,
          maxSize: '20M',
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.json(),
          ),
          level: 'error',
        }),
      ],
    });
  }
  log(message: any, context: string) {
    const timestamp = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, timestamp });
  }
  info(message: any, context: string) {
    const timestamp = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(message, { context, timestamp });
  }
  warn(message: any, context: string) {
    const timestamp = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.warn(message, { context, timestamp });
  }
  error(message: any, context: string) {
    const timestamp = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.error(message, { context, timestamp });
  }
  debug(message: any, context: string) {
    const timestamp = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.debug(message, { context, timestamp });
  }
}

// // 日志级别
// // const levels = {
// //   error: 0,
// //   warn: 1,
// //   info: 2,
// //   http: 3,
// //   verbose: 4,
// //   debug: 5,
// //   silly: 6,
// // }

// 1. 手动记录

// import { ConsoleLogger, Injectable } from '@nestjs/common';

// @Injectable()
// export class MyLogger extends ConsoleLogger {
//   error(message: any, trace?: string, context?: string) {
//     message = message + ' - 当前环境: dev';
//     super.error(message, trace, context);
//   }

//   log(message: any, context?: string) {
//     message = message + ' - 当前环境: dev';
//     super.log(message, context);
//   }
// }
