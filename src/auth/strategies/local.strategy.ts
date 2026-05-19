import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

type SignInUser = { id: number; username: string };

@Injectable()
export class LocalStrategy extends PassportStrategy<any>(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(username: string, password: string): SignInUser {
    const user = this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
