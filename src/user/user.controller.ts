import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, // Troquei por um Decorator personalizado
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@UseInterceptors(LogInterceptor) // -> Intercptador de Controle (Todas as rotas)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseInterceptors(LogInterceptor) -> Interceptador de Rota
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@ParamId() id: number) {
    // Chamando decorator do param-id criado
    console.log({ id }); // Mostra que realmente foi convertido e o Decorator personalizado está funcionando
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number) {
    return await this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number) {
    return await this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id) {
    return await this.userService.delete(id);
  }
}
