import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  username: string;
  password: string;
};

// FIXME: For demo purposes, we're using a hardcoded list of users. In a real application, you would likely fetch this data from a database.
const users: User[] = [
  {
    id: 1,
    username: 'john',
    password: 'changeme',
  },
  {
    id: 2,
    username: 'maria',
    password: 'guess',
  },
  {
    id: 3,
    username: 'alice',
    password: 'secret',
  },
];

@Injectable()
export class UsersService {
  findUserByUsername(username: string): User | undefined {
    return users.find((user) => user.username === username);
  }
}
