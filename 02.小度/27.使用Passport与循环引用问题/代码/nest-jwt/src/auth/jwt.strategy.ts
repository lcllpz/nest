import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('JwtStrategy constructor');
    console.log(authService, 'authService');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MySecret',
    });
  }

  validate(payload: any) {
    console.log(payload, 'payload');
    return { username: payload.username, password: payload.sub };
  }
}
