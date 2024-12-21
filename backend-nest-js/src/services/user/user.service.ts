import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from './user.dto';
import { Training } from 'src/entities/training.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUsers() {
    const users = await this.userRepository.findAll({ include: [Training] });

    return users;
  }

  async createUserByTelegramId(params: UpdateUserDto) {
    const user = await this.userRepository.create(params);

    return user;
  }

  async getUserByTelegramId(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async updateUserByTelegramId(params: UpdateUserDto) {
    const { telegramID, ...rest } = params;

    const user = await this.userRepository.findByPk(telegramID);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await user.update(rest);

    return updatedUser;
  }

  async deleteUserByTelegramId(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const deletedUser = await user.destroy();

    return deletedUser;
  }
}
