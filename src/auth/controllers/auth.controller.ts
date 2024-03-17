import { Controller, Post, Body, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { GetUser, RawHeaders, Auth } from '../decorators';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { ValidRoles } from '../interfaces/valid-roles.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiBearerAuth('JWT')
  @Auth()
  @Get('check-auth-token')
  checkAuthToken(@GetUser() user: User) {
    return this.authService.checkUser(user);
  }

  @Get('me')
  @ApiBearerAuth('JWT')
  @Auth(ValidRoles.USER)
  private(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return { user, email, headers: rawHeaders };
  }
}
