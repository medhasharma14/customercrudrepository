import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from './auth.module';
import { CustomerService } from 'src/customer/customer.service';

import { Param } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private customerService: CustomerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(@Param('email') email: string) {
    const user = await this.customerService.findOne(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}