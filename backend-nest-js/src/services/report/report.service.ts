/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TrainingService } from '../training/training.service';
const XLSX = require('xlsx');

@Injectable()
export class ReportService {
  constructor(
    private userService: UserService,
    private trainingService: TrainingService,
  ) {}

  async getReport() {
    const workbook = XLSX.utils.book_new();

    const users = await this.userService.getUsers();

    const trainings = await this.trainingService.getTrainings();

    const formattedUsers = users.map((user) => {
      return {
        'telegram ID': user.dataValues.telegramID,
        Имя: user.dataValues.name,
        Никнейм: user.dataValues.username,
        Рост: user.dataValues.height,
        Вес: user.dataValues.weight,
        Цели: user.dataValues.goals,
        Травмы: user.dataValues.injuries,
        Комментарий: user.dataValues.comment,
        Роль: user.dataValues.role,
      };
    });

    const formattedTrainings = trainings.map((training) => {
      return {
        'telegram ID': training.dataValues.userId,
        Имя: training.dataValues.user.name,
        Дата: training.dataValues.date,
        Комментарий: training.dataValues.comment,
      };
    });

    const usersWorksheet = XLSX.utils.json_to_sheet(formattedUsers, {
      header: [
        'telegram ID',
        'Имя',
        'Никнейм',
        'Рост',
        'Вес',
        'Цели',
        'Травмы',
        'Комментарий',
        'Роль',
      ],
    });

    const trainingsWorksheet = XLSX.utils.json_to_sheet(formattedTrainings, {
      header: ['telegram ID', 'Имя', 'Дата', 'Комментарий'],
    });

    XLSX.utils.book_append_sheet(
      workbook,
      usersWorksheet,
      'Пользователи',
      true,
    );

    XLSX.utils.book_append_sheet(
      workbook,
      trainingsWorksheet,
      'Список всех тренировок',
      true,
    );

    XLSX.writeFileXLSX(workbook, 'report.xlsx');
  }
}
