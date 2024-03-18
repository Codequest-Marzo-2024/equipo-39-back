import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import {
  ParticipantsService,
  DrawRaffleService,
  RafflesService,
} from '../services';
import { CreateRaffleDto, UpdateRaffleDto, CreateParticipantDto } from '../dto';

@ApiTags('Raffles')
@Controller('raffles')
export class RafflesController {
  constructor(
    private readonly rafflesService: RafflesService,
    private readonly participantService: ParticipantsService,
    private readonly drawRaffleService: DrawRaffleService,
  ) {}

  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  @Get()
  findAllRaffles() {
    return this.rafflesService.findAll();
  }

  @Get(':id')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  findOneRaffleById(@Param('id', ParseIntPipe) id: number) {
    return this.rafflesService.findOne(id);
  }

  @Get(':raffleUUID/uuid')
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  findOneRaffleByUUID(@Param('raffleUUID', ParseUUIDPipe) raffleUUID: string) {
    return this.rafflesService.findOneByUuid(raffleUUID);
  }

  @ApiOperation({
    summary: 'Create a new raffle',
  })
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  @Post()
  createRaffle(
    @Body() createRaffleDto: CreateRaffleDto,
    @GetUser() user: User,
  ) {
    return this.rafflesService.create(createRaffleDto, user);
  }

  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  @Patch(':raffleId')
  updateRaffle(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Body() updateRaffleDto: UpdateRaffleDto,
  ) {
    return this.rafflesService.update(raffleId, updateRaffleDto);
  }

  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
  @Delete(':raffleId')
  remove(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.rafflesService.remove(raffleId);
  }

  @Get(':raffleId/participants')
  findAllParticipants(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.participantService.findAllParticipants(raffleId);
  }

  @ApiOperation({
    summary: 'Register a participant in a raffle',
    description:
      'The participant must belong to the community on the Discord server where the draw will take place.',
  })
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
  @ApiBearerAuth('JWT')
  @Delete(':raffleId/participant/:participantId')
  removeParticipant(
    @Param('raffleId', ParseIntPipe) raffleId: number,
    @Param('participantId', ParseIntPipe) participantId: number,
  ) {
    return this.participantService.removeParticipant(raffleId, participantId);
  }

  @ApiOperation({
    summary: 'Draw the winners of a raffle',
    description:
      'Winners will be drawn from the list of participants who have registered for the draw. The giveaway must be active and not have ended its final date.',
  })
  @Auth(ValidRoles.ADMIN)
  @ApiBearerAuth('JWT')
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
  @ApiBearerAuth('JWT')
  @Delete(':raffleId/winners')
  removeWinners(@Param('raffleId', ParseIntPipe) raffleId: number) {
    return this.drawRaffleService.removeWinners(raffleId);
  }
}
