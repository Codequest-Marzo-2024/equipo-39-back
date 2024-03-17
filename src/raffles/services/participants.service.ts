import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { handlerErrorDB } from 'src/common/utils/handler-errors-db';
import config from 'src/configurations/env-config';
import { CreateParticipantDto } from '../dto';
import { DiscordApiService } from './discord-api.service';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ParticipantsService {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
    private prismaService: PrismaService,
    private readonly discordApiService: DiscordApiService,
  ) {}

  async registerParticipant(
    raffleId: number,
    createParticipantDto: CreateParticipantDto,
  ) {
    await this.validateRaffleIsActive(raffleId);

    const isMemberInDiscord = await this.discordApiService.searchMemberById(
      this.configService.discord.idServer,
      createParticipantDto.idPlatform,
    );

    if (!isMemberInDiscord) {
      throw new BadRequestException(
        `User not found in Server Discord: ${isMemberInDiscord.guild}`,
      );
    }

    try {
      return await this.prismaService.participant.create({
        data: {
          username: isMemberInDiscord.username,
          idPlatform: isMemberInDiscord.id,
          Raffle: {
            connect: {
              id: raffleId,
            },
          },
        },
      });
    } catch (error) {
      handlerErrorDB(error, 'Participant');
    }
  }

  async findAllParticipants(raffleId: number) {
    return await this.prismaService.participant.findMany({
      where: {
        Raffle: {
          id: raffleId,
        },
      },
    });
  }

  async removeParticipant(raffleId: number, participantId: number) {
    try {
      return await this.prismaService.participant.update({
        data: {
          isActive: false,
        },
        where: {
          id: participantId,
          raffleId,
        },
      });
    } catch (error) {
      handlerErrorDB(error, 'Participant');
    }
  }

  async validateRaffleIsActive(raffleId: number) {
    const raffle = await this.prismaService.raffle.findUnique({
      where: {
        id: raffleId,
      },
    });

    if (!raffle.isActive) {
      throw new BadRequestException('Raffle is not active or does not exist');
    }

    if (new Date() < new Date(raffle.initialDate)) {
      throw new BadRequestException('Raffle has not started');
    }

    if (new Date() > new Date(raffle.finalDate)) {
      throw new BadRequestException('Raffle has ended');
    }

    if (raffle.isFinished) {
      throw new BadRequestException('Raffle is finished');
    }
  }
}
