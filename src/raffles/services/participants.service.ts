import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateParticipantDto } from '../dto';
import { DiscordApiService } from './discord-api.service';
import { handlerErrorDB } from 'src/common/utils/handler-errors-db';

@Injectable()
export class ParticipantsService {
  constructor(
    private prismaService: PrismaService,
    private readonly discordApiService: DiscordApiService,
  ) {}

  async registerParticipant(
    raffleId: number,
    createParticipantDto: CreateParticipantDto,
  ) {
    // TODO: Antes de registrar, se debe Verificar si en un servidor especifico de discord existe un usuario con el mismo nombre

    try {
      return await this.prismaService.participant.create({
        data: {
          ...createParticipantDto,
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
}
