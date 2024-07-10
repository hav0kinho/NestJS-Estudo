import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

// Guard que deve ser usado para autenticação. Um Guard deve implementar a classe "CanActivate" e esse método deve retornar true ou false. AuthGuard resgata os dados do Request e verificar se o Token foi passado no Header. Além disso ele "insere" dentro do request os dados descriptografados do token e também o usuário que foi extraido do banco com os dados do Token.
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers; // Retira o token "bearer <dados>"
    try {
      const data = this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      ); // Verifica se o token existe e retira apenas o token, já que o bearer não é usado.

      request.tokenPayload = data; // Insere dentro do request uma nova propriedade chamada tokenPayload com os dados descriptografados.

      request.user = await this.userService.show(data.id); // Insere dentro do request uma nova propriedade chamada user com o usuário resgatado do banco.

      return true; // Retorna true, dando prosseguimento para outros guards e para a rota.
    } catch (e) {
      return false; // Se acontecer algum problema, retorna false (ai o Nest joga uma exceção)
    }
  }
}
