import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
import { IPayload } from '../shared/types';

const { SECRET_KEY } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    });
  }

  async validate(payload: IPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      return done(
        new UnauthorizedException('Unauthorized access'),
        false,
      );
    }

    return done(null, user, payload.iat);
  }
}
