import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { RafflesController, DiscordApiController } from './controllers';
import {
  RafflesService,
  ParticipantsService,
  DiscordApiService,
  DrawRaffleService,
} from './services';

@Module({
  controllers: [RafflesController, DiscordApiController],
  providers: [
    PrismaService,
    RafflesService,
    ParticipantsService,
    DiscordApiService,
    DrawRaffleService,
  ],
})
export class RafflesModule {}
