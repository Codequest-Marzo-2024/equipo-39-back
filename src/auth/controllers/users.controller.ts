import { UpdateUserDto } from '../dtos';
import {
  Controller,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Auth } from '../decorators';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Auth(ValidRoles.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/make-admin')
  makeAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.makeAdmin(id);
  }
}
