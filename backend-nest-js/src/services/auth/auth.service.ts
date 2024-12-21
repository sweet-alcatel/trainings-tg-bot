import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Training } from 'src/entities/training.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async signIn(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      include: [Training],
    });

    if (!user) {
      throw new HttpException('Нет доступа', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
