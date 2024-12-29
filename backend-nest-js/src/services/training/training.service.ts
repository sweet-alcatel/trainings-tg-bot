import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Training } from 'src/entities/training.entity';
import { CreateTrainingDto } from './training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training) private trainingRepository: typeof Training,
  ) {}

  async getTrainingsByTelegramID(id: string) {
    console.log(id);
    const trainings = await this.trainingRepository.findAll({
      where: { userId: id },
    });

    if (!trainings) {
      throw new HttpException('Тренировок не найдено', HttpStatus.NOT_FOUND);
    }

    return trainings;
  }

  async addTrainingToUser(params: CreateTrainingDto) {
    const training = await this.trainingRepository.create(params);

    return training;
  }
}
