import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './services/user/user.module';
import { TrainingModule } from './services/training/training.module';
import { ConfigModule } from '@nestjs/config';

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
    AuthModule,
    UserModule,
    TrainingModule,
  ],
})
export class AppModule {}
