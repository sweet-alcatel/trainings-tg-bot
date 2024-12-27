import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserByTelegramId(id);
  }

  @Post()
  async createUser(@Body() params: UpdateUserDto) {
    return await this.userService.createUserByTelegramId(params);
  }

  @Patch()
  async updateUser(@Body() params: UpdateUserDto) {
    return await this.userService.updateUserByTelegramId(params);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserByTelegramId(id);
  }
}
