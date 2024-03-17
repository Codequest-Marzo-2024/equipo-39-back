import { IsString, IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateRaffleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  url: string;

  @IsDateString()
  @ApiProperty()
  initialDate: string;

  @IsDateString()
  @ApiProperty()
  finalDate: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive: boolean;
}

export class UpdateRaffleDto extends PartialType(CreateRaffleDto) {}
