import { applyDecorators, createParamDecorator, ExecutionContext, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { MyCombinedDecorator } from './custom.decorator';
import { CustomGuard } from './custom.guard';

export const MySetUser = (...args: string[]) => SetMetadata('MySetUser', args);

export const MySetGetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
    // console.log("MySetGetUser-data", data);
    // console.log("MySetGetUser-ctx", ctx);
    const request = ctx.switchToHttp().getRequest();

    return    request.query[data] || "lcl-data";
});

export const MySetGetHeaders = createParamDecorator((data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.headers[data.toLowerCase()] : request.headers;
});

export const MySetCombinedDecorator = (path: string, ...user: string[]) => applyDecorators(
    Get(path),
    MySetUser(...user),
    UseGuards(CustomGuard)
);