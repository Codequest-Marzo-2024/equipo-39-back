import { Injectable } from '@nestjs/common';

import { handlerErrorDB } from 'src/common/utils/handler-errors-db';
import { UpdateUserDto } from '../dtos';
import { PrismaService } from 'src/prisma.service';
import { ValidRoles } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      handlerErrorDB(error, 'User');
    }
  }

  async makeAdmin(userId: number) {
    const user = await this.prismaService.user.update({
      where: { id: userId },

      data: { role: { connect: { id: ValidRoles.ADMIN } } },

      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    return user;
  }
}
