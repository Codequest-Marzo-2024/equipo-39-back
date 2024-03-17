import { Module } from '@nestjs/common';
import { RafflesService } from './services/raffles.service';
import { RafflesController } from './controllers/raffles.controller';
import { PrismaService } from 'src/prisma.service';
import { ParticipantsService } from './services/participants.service';
import { DiscordApiService } from './services/discord-api.service';
import { DrawRaffleService } from './services/draw-raffle.service';

@Module({
  controllers: [RafflesController],
  providers: [
    PrismaService,
    RafflesService,
    ParticipantsService,
    DiscordApiService,
    DrawRaffleService,
  ],
})
export class RafflesModule {}
