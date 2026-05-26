import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class GlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log("GlInterceptor",context.getType());
    // console.log("GlInterceptor",context.getHandler().name);
    // console.log("GlInterceptor",context.getClass());
    // console.log("GlInterceptor",context.switchToHttp().getRequest().url);
    return next.handle().pipe(map((data) => data.toUpperCase()));
  }
}
