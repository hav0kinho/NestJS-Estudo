import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

// Esse decorator deve ser usado em conjunto com o auth.guard! Ele recebe alguma informação passada como parâmetro (email, id, user, etc) e então retorna apenas essa informação. Também pode retornar todos os dados do usuário caso não seja passado o parâmetro.
export const User = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (filter) {
        return request.user[filter];
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário.',
      );
    }
  },
);
