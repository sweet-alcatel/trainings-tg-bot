import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUsers() {
    const users = await this.userRepository.findAll();

    if (!users) {
      throw new HttpException('Пользователей не найдено', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async createUser(params: CreateUserDto) {
    const user = await this.userRepository.create(params);

    return user;
  }

  async getUserByTelegramId(id: string) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateUserByTelegramId(id: string, params: UpdateUserDto) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await user.update(params);

    return updatedUser;
  }

  async deleteUserByTelegramId(id: string) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await user.destroy();

    return deletedUser;
  }
}
