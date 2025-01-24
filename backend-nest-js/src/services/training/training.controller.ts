import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './training.dto';

@Controller('/api/v1/training/')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Get()
  async getTrainings() {
    return await this.trainingService.getTrainings();
  }

  @Get(':id')
  async getTrainingsByID(@Param('id') id: string) {
    return await this.trainingService.getTrainingsByTelegramID(id);
  }

  @Post()
  async addTrain(@Body() params: CreateTrainingDto) {
    return await this.trainingService.addTrainingToUser(params);
  }
}
