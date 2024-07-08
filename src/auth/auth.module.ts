import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // o .register() serve para colocar algumas configurações extras no módulo e criar um modificado. No caso abaixo, estamos apenas alterando o Secret que servirá para descriptografar o Token
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
