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
import { RafflesService } from './raffles.service';
import { CreateRaffleDto, UpdateRaffleDto } from './dto/raffle.dto';

@Controller('raffles')
export class RafflesController {
  constructor(private readonly rafflesService: RafflesService) {}

  @Post()
  create(@Body() createRaffleDto: CreateRaffleDto) {
    return this.rafflesService.create(createRaffleDto);
  }

  @Get()
  findAll() {
    return this.rafflesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rafflesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRaffleDto: UpdateRaffleDto,
  ) {
    return this.rafflesService.update(id, updateRaffleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rafflesService.remove(id);
  }
}
