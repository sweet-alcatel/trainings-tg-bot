import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './training.dto';
import { Role, Roles } from 'src/lib/roles';
import { RolesGuard } from 'src/guards/role';

@Controller('/api/v1/training/')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Get(':id')
  async getTrainings(@Param('id') id: string) {
    return await this.trainingService.getTrainingsByTelegramID(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  async addTrain(@Body() params: CreateTrainingDto) {
    return await this.trainingService.addTrainingToUser(params);
  }
}
