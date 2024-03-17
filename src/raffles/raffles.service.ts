import { Injectable } from '@nestjs/common';
import { CreateRaffleDto, UpdateRaffleDto } from './dto/raffle.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RafflesService {
  constructor(private prismaService: PrismaService) {}

  create(createRaffleDto: CreateRaffleDto) {
    return 'This action adds a new raffle';
  }

  findAll() {
    return `This action returns all raffles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raffle`;
  }

  update(id: number, updateRaffleDto: UpdateRaffleDto) {
    return `This action updates a #${id} raffle`;
  }

  remove(id: number) {
    return `This action removes a #${id} raffle`;
  }
}
