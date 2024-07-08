import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "3+|M5/OJ0>k/7syp!!.zMk'H£0m]gd$I",
    }),
  ],
})
export class AuthModule {}
