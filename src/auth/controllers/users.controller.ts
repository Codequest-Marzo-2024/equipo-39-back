import { UpdateUserDto } from '../dtos';
import {
  Controller,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { Auth } from '../decorators';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @Auth(ValidRoles.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/make-admin')
  @Auth(ValidRoles.ADMIN)
  makeAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.makeAdmin(id);
  }
}
