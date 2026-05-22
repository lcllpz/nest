import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PersonService } from './person.service';

@Injectable()
export class PersonMiddleware implements NestMiddleware {
  @Inject(PersonService)
  private personService: PersonService;
  use(req: Request, res: Response, next: NextFunction) {
    console.log('before 中间件 ---' + req.url);
    console.log('调用注入的服务 --- ' + this.personService.findAll());
    next();
    console.log('after 中间件 ---' + res.statusCode);
  }
}
