import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserModule } from '../user/user.module';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [UserModule, TrainingModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
