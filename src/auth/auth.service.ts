import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './auth.dto';

type SignInUser = {
  id: number;
  username: string;
};
type AuthenticatedUser = SignInUser & {
  access_token: string;
  token_type: 'bearer';
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(input: LoginDto): SignInUser | null {
    const user = this.userService.findUserByUsername(input.username);
    if (!user) {
      return null;
    }
    if (user.password === input.password) {
      return { id: user.id, username: user.username };
    }
    return null;
  }

  signIn(user: SignInUser): AuthenticatedUser {
    const tokenPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(tokenPayload);
    return { ...user, access_token: accessToken, token_type: 'bearer' };
  }

  authenticateUser(input: LoginDto): AuthenticatedUser | null {
    const user = this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.signIn(user);
  }
}
