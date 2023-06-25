import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      delete user.hash;
      return user;
    } catch (err) {
      console.log(err);
      if (err instanceof PrismaClientKnownRequestError) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }
}
