import { Body, Controller, Post } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './training.dto';

@Controller('/api/v1/training/')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Post()
  async addTrain(@Body() params: CreateTrainingDto) {
    return await this.trainingService.addTrainingToUser(params);
  }
}
