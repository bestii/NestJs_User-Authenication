import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { type SignInUser } from '../auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy<any>(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<SignInUser> {
    const user = await this.authService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }
}
