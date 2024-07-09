import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, AuthModule], // Importando todos os modulos que a aplicação irá usar.
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
