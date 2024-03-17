import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { encryptData, compareData } from 'src/common/utils/encryptData';
import { handlerErrorDB } from 'src/common/utils/handler-errors-db';
import { LoginUserDto, CreateUserDto } from '../dtos';
import { JwtPayload, ValidRoles } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, email } = createUserDto;

      const user = await this.prismaService.user.create({
        data: {
          email,
          password: encryptData(password),
          role: { connect: { id: ValidRoles.USER } },
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      handlerErrorDB(error, 'Auth');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Creditentials invalid');

    if (!compareData(password, user.password))
      throw new UnauthorizedException('Creditentials are not valid');

    delete user?.password;

    return { ...user, jwt: this.getJsonWebToken({ uid: user.id }) };
  }

  async checkUser(user: User) {
    return { ...user, jwt: this.getJsonWebToken({ uid: user.id }) };
  }

  private getJsonWebToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
