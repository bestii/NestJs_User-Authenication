import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiSecurity } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';
import { PassportLocalGuard } from './guards/passport-local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiBody({ type: LoginDto })
  @UseGuards(PassportLocalGuard)
  login(@Request() request: { user: { id: number; username: string } }) {
    return this.authService.signIn(request.user);
  }

  @ApiSecurity('oauth2')
  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request: { user?: { id: string; username: string } }) {
    return request.user;
  }
}
