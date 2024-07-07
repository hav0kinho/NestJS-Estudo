import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    // Data está como unknown porque ele não está sendo passado aparentemente, já que o Decorator não está recebendo argumentos
    return Number(context.switchToHttp().getRequest().params.id); // Converte o ID do context para Number
  },
);
