import { IsString, IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRaffleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  url: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDateString({
    strictSeparator: true,
  })
  deadline: string;
}

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {}
