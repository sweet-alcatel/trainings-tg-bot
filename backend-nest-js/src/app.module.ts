import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './services/user/user.module';
import { TrainingModule } from './services/training/training.module';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './services/report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database',
      autoLoadModels: true,
    }),
    UserModule,
    TrainingModule,
    ReportModule,
  ],
})
export class AppModule {}
