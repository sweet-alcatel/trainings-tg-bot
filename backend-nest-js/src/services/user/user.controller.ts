import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Roles, Role } from 'src/lib/roles';
import { RolesGuard } from 'src/guards/role';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserByTelegramId(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async createUser(@Body() params: CreateUserDto) {
    return await this.userService.createUser(params);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async updateUser(@Param('id') id: string, @Body() params: UpdateUserDto) {
    return await this.userService.updateUserByTelegramId(id, params);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserByTelegramId(id);
  }
}
