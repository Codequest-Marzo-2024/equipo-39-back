import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import {
  ParticipantsService,
  DrawRaffleService,
  RafflesService,
} from '../services';
import { CreateRaffleDto, UpdateRaffleDto, CreateParticipantDto } from '../dto';

@Controller('raffles')
export class RafflesController {
  constructor(
    private readonly rafflesService: RafflesService,
    private readonly participantService: ParticipantsService,
    private readonly drawRaffleService: DrawRaffleService,
  ) {}

  @Auth(ValidRoles.ADMIN)
  @Get()
  findAllRaffles() {
    return this.rafflesService.findAll();
  }

  @Get(':raffleId')
  @Auth(ValidRoles.ADMIN)
  findOneRaffleById(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.rafflesService.findOne(raffleId);
  }

  @Auth(ValidRoles.ADMIN)
  @Post()
  createRaffle(
    @Body() createRaffleDto: CreateRaffleDto,
    @GetUser() user: User,
  ) {
    return this.rafflesService.create(createRaffleDto, user);
  }

  @Auth(ValidRoles.ADMIN)
  @Patch(':raffleId')
  updateRaffle(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Body() updateRaffleDto: UpdateRaffleDto,
  ) {
    return this.rafflesService.update(raffleId, updateRaffleDto);
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':raffleId')
  remove(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.rafflesService.remove(raffleId);
  }

  @Get(':raffleId/participants')
  findAllParticipants(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.participantService.findAllParticipants(raffleId);
  }

  @Post(':raffleId/participant')
  registerParticipant(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Body() createParticipantDto: CreateParticipantDto,
  ) {
    return this.participantService.registerParticipant(
      raffleId,
      createParticipantDto,
    );
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':raffleId/participant/:participantId')
  removeParticipant(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Param('participantId', ParseIntPipe) participantId: number,
  ) {
    return this.participantService.removeParticipant(raffleId, participantId);
  }

  @Auth(ValidRoles.ADMIN)
  @Get(':raffleId/draw/:quantityWinners')
  drawRaffle(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Param('quantityWinners', ParseIntPipe) quantityWinners: number,
  ) {
    return this.drawRaffleService.drawRaffle(raffleId, quantityWinners);
  }

  @Get(':raffleId/winners')
  getWinners(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.drawRaffleService.getWinners(raffleId);
  }

  @Auth(ValidRoles.ADMIN)
  @Delete(':raffleId/winners')
  removeWinners(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.drawRaffleService.removeWinners(raffleId);
  }
}
