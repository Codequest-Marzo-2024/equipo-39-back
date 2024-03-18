import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DrawRaffleService {
  constructor(private readonly prismaService: PrismaService) {}

  async drawRaffle(raffleId: number, quantityWinners: number) {
    const participantIds = await this.prismaService.participant.findMany({
      where: {
        raffleId,
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    if (participantIds.length < quantityWinners) {
      throw new BadRequestException(
        'The quantity of winners is greater than the quantity of participants',
      );
    }

    const raffle = await this.prismaService.raffle.findFirst({
      where: {
        id: raffleId,
        OR: [{ isFinished: true }, { isActive: false }],
      },
    });

    if (raffle) {
      throw new BadRequestException(
        'The raffle has already been drawn or is not active',
      );
    }

    const winners = [];

    for (let i = 0; i < quantityWinners; i++) {
      const randomIndex = Math.floor(Math.random() * participantIds.length);
      const winner = participantIds[randomIndex];
      winners.push(winner);
      participantIds.splice(randomIndex, 1);
    }

    const data = winners.map((winner) => {
      return {
        raffleId,
        participantId: winner.id,
      };
    });

    const resp = await this.prismaService.winner.createMany({
      data,
    });

    await this.prismaService.raffle.update({
      where: {
        id: raffleId,
      },
      data: {
        isFinished: true,
      },
    });

    return resp;
  }

  async getWinners(raffleId: number) {
    return await this.prismaService.winner.findMany({
      where: {
        raffleId,
      },
      include: {
        Participant: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async removeWinners(raffleId: number) {
    await this.prismaService.raffle.update({
      where: {
        id: raffleId,
      },
      data: {
        isFinished: false,
      },
    });

    return await this.prismaService.winner.deleteMany({
      where: {
        raffleId,
      },
    });
  }
}
