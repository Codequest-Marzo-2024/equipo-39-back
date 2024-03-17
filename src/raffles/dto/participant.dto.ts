import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateParticipantDto {
  @IsString()
  username: string;

  @IsString()
  idPlatform: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {}
