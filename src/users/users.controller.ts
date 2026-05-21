import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.usersService.findAllUsers();
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiSecurity('oauth2')
  @Get('/me')
  @UseGuards(PassportJwtAuthGuard)
  async getUserInfo(
    @Request() request: { user: { id: string; username: string } },
  ) {
    return await this.usersService.getUserInfo(request.user.id);
  }
}
