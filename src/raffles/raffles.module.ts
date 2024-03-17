import { Module } from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { RafflesController } from './raffles.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RafflesController],
  providers: [PrismaService, RafflesService],
})
export class RafflesModule {}
