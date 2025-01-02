import { Module } from '@nestjs/common';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Training } from 'src/entities/training.entity';

@Module({
  imports: [SequelizeModule.forFeature([Training])],
  exports: [TrainingService],
  controllers: [TrainingController],
  providers: [TrainingService],
})
export class TrainingModule {}
