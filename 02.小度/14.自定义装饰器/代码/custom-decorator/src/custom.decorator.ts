import {
  applyDecorators,
  Controller,
  createParamDecorator,
  ExecutionContext,
  Get,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CustomGuard } from './custom.guard';

export const SetUser = (...args: string[]) => SetMetadata('SetUser', args);

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    console.log(request);
    console.log(data);
    return request.query[data];
  },
);

export const MyHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return data ? request.headers[data] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.query[data];
  },
);

export const MyParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return data ? request.params[data] : request.params;
  },
);

export function MyCombinedDecorator(path: string, ...user: string[]) {
  return applyDecorators(Get(path), SetUser(...user), UseGuards(CustomGuard));
}

export function MyController(path: string, metaData: string) {
  return applyDecorators(Controller(path), SetMetadata('MyClass', metaData));
}
