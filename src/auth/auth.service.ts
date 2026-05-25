import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { type SignInUser } from './auth.dto';

type AuthenticatedUser = SignInUser & {
  access_token: string;
  token_type: 'bearer';
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signIn(user: SignInUser): AuthenticatedUser {
    const tokenPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(tokenPayload);
    return { ...user, access_token: accessToken, token_type: 'bearer' };
  }
}
