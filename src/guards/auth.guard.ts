import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { authorization } = context.switchToHttp().getRequest().headers;
    console.log({ authorization });
    return true;
  }
}
