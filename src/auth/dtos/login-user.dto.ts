import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email should be a valid email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    minLength: 6,
    maxLength: 50,
    description:
      'Password should contain at least one uppercase letter, one lowercase letter, one number and special character and must be at least 6 characters long',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password too weak. Must contain at least one uppercase letter, one lowercase letter, one number and special character and must be at least 6 characters long.',
    },
  )
  password: string;
}
