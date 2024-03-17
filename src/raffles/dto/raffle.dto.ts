import { IsString, IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRaffleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsDateString()
  initialDate: string;

  @IsDateString()
  finalDate: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {}
