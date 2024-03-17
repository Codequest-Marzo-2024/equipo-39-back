import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRaffleDto, UpdateRaffleDto } from '../dto/raffle.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { handlerErrorDB } from 'src/common/utils/handler-errors-db';

@Injectable()
export class RafflesService {
  constructor(private prismaService: PrismaService) {}

  async create(createRaffleDto: CreateRaffleDto, mabeBy: User) {
    this.validateDates(createRaffleDto.initialDate, createRaffleDto.finalDate);
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
    try {
      return await this.prismaService.raffle.findUniqueOrThrow({
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
          Winner: true,
          _count: {
            select: {
              Participant: { where: { isActive: true } },
            },
          },
        },
      });
    } catch (error) {
      handlerErrorDB(error, 'Raffle');
    }
  }

  async update(id: number, updateRaffleDto: UpdateRaffleDto) {
    if (updateRaffleDto.finalDate) {
      this.validateDates(
        updateRaffleDto.initialDate,
        updateRaffleDto.finalDate,
      );
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
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });
  }

  validateDates(initialDate: string, finalDate: string) {
    const currentDate = new Date();
    const startDate = new Date(initialDate);
    const endDate = new Date(finalDate);

    if (endDate < currentDate) {
      throw new BadRequestException(
        'The end date must be greater than the current date',
      );
    }

    if (endDate < startDate) {
      throw new BadRequestException(
        'The end date must be greater than the start date',
      );
    }
  }
}
