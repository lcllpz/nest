import { Controller, Get, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('CONFIG_OPTIONS') private readonly options: Record<string, any>,
  ) {}

  @Get()
  findAll() {
    console.log(this.options);
    return this.authService.findAll();
  }
}
