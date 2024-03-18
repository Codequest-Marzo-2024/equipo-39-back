import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import config from './configurations/env-config';
import { environments } from './configurations/environments';
import { JoiValidationSchema } from './configurations/joi-validation';

import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RafflesModule } from './raffles/raffles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, process.env.STATIC_PATH),
    }),

    AuthModule,

    RafflesModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
