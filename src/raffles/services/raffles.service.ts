import { Injectable } from '@nestjs/common';
import { CreateRaffleDto, UpdateRaffleDto } from '../dto/raffle.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { handlerErrorDB } from 'src/common/utils/handler-errors-db';

@Injectable()
export class RafflesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRaffleDto: CreateRaffleDto, mabeBy: User) {
    this.validateFinalDate(createRaffleDto.finalDate);
    const initialDate = new Date(createRaffleDto.initialDate);
    const finalDate = new Date(createRaffleDto.finalDate);

    try {
      const data = await this.prismaService.raffle.create({
        data: {
          ...createRaffleDto,
          initialDate,
          finalDate,
          User: {
            connect: {
              id: mabeBy.id,
            },
          },
        },
      });

      return data;
    } catch (error) {
      handlerErrorDB(error, 'Raffle');
    }
  }

  async findAll() {
    return await this.prismaService.raffle.findMany({
      include: {
        User: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: {
            Participant: { where: { isActive: true } },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.raffle.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          select: {
            id: true,
            email: true,
          },
        },
        _count: {
          select: {
            Participant: { where: { isActive: true } },
          },
        },
      },
    });
  }

  async update(id: number, updateRaffleDto: UpdateRaffleDto) {
    if (updateRaffleDto.finalDate) {
      this.validateFinalDate(updateRaffleDto.finalDate);
    }

    try {
      const data = await this.prismaService.raffle.update({
        where: {
          id,
        },
        data: {
          ...updateRaffleDto,
          initialDate: updateRaffleDto.initialDate
            ? new Date(updateRaffleDto.initialDate)
            : undefined,
          finalDate: updateRaffleDto.finalDate
            ? new Date(updateRaffleDto.finalDate)
            : undefined,
        },
      });

      return data;
    } catch (error) {
      handlerErrorDB(error, 'Raffle');
    }
  }

  remove(id: number) {
    return this.prismaService.raffle.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  validateFinalDate(finalDate: string) {
    const date = new Date(finalDate);

    if (date < new Date()) {
      throw new Error('The deadline must be greater than the current date');
    }
  }
}
