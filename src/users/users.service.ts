import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { type CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const data = {
      ...user,
      password: hashedPassword,
    };
    const createdUser = await this.prisma.user.create({ data });
    const { id, username, name } = createdUser;
    return {
      id,
      name,
      username,
    };
  }

  findUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }
}
