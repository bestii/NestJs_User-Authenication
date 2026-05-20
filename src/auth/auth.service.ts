import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, type SignInUser } from './auth.dto';

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

  async validateUser(input: LoginDto) {
    const user = await this.userService.findUserByUsername(input.username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(input.password, user.password);
    if (isMatch) {
      return { id: user.id, username: user.username };
    }
    return null;
  }

  signIn(user: SignInUser): AuthenticatedUser {
    const tokenPayload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(tokenPayload);
    return { ...user, access_token: accessToken, token_type: 'bearer' };
  }

  async authenticateUser(input: LoginDto): Promise<AuthenticatedUser | null> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.signIn(user);
  }
}
