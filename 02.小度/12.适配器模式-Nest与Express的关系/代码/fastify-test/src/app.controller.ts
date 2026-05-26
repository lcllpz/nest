import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply, FastifyRequest } from 'fastify';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: FastifyRequest, @Res() response: FastifyReply) {
    console.log(request.url);
    response.send('hello');
  }
}
