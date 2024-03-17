import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { PrismaService } from 'src/prisma.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private consfigService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: consfigService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const { uid } = payload;

    const user = await this.prismaService.user.findUnique({
      where: { id: uid },
      select: {
        id: true,
        email: true,
        roleId: true,
        isActive: true,
      },
    });

    if (!user) throw new UnauthorizedException('Creditentials invalid');

    if (!user.isActive) throw new UnauthorizedException('User is not active');

    return user;
  }
}
