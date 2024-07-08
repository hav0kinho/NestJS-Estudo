import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: "3+|M5/OJ0>k/7syp!!.zMk'H£0m]gd$I",
    }),
    UserModule,
    PrismaModule,
  ],
})
export class AuthModule {}
