import { PartialType } from '@nestjs/mapped-types';

export class CreateRaffleDto {}

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {}
