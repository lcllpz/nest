import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, filter, map, Observable, tap, toArray } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('---auth before interceptor---');

    return next.handle().pipe(
      map((data) => data.toUpperCase()),
      filter((data) => data.includes('A')),
      tap((data) => console.log('auth after interceptor', data)),

      toArray(),

      catchError((err) => {
        console.log('---catchError---', err);
        throw new Error(err);
      }),
    );
  }
}
