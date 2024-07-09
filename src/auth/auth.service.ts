import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable() // Esse serviço irá trabalhar com a parte de autenticação do JWT, além de outras funcionalidades como troca de senha e etc.
export class AuthService {
  // Alguns atributos para melhorar a refatoração caso seja necessário mudar, já que os mesmos dados são usados em mais de um lugar;
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    // A criação do token é feita aqui, o sign() recebe os dados que você deseja colocar e também as configurações que você deseja acrescentar!
    return {
      accessToken: this.jwtService.sign(
        {
          // Colocamos os dados que desejo colocar no token (Lembre-se que você tem liberdade aqui, você pode colocar oque você quiser)
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          // Também estamos colocando as configurações (Aparentemente o JWT do Nest aceita esse tipo de expiresIn também)
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  async checkToken(token: string) {
    // Verifica se o token é valido, se não retorna um erro de BadRequest
    try {
      const data = this.jwtService.verify(token, {
        audience: this.issuer,
        issuer: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto.');
    }

    //TO DO: Enviar o e-mail...

    return true;
  }

  async reset(password: string, token: string) {
    //TO DO: Validar o token...

    const id = 0;

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user); // Após o Reset de senha, ele já retorna o token
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user); // Após o Register ele também já retorna o Token
  }
}
