import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Training } from 'src/entities/training.entity';
import { CreateTrainingDto } from './training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectModel(Training) private trainingRepository: typeof Training,
  ) {}

  async addTrainingToUser(params: CreateTrainingDto) {
    const training = await this.trainingRepository.create(params);

    return training;
  }
}
