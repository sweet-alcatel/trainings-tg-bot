/* eslint-disable @typescript-eslint/no-require-imports */
import { CommandContext, Context } from 'grammy';
import { checkRole } from '../helpers/checkRole';
import { Role } from '../data/role';

const fetch = require('node-fetch');

export const getUsers = async (ctx: CommandContext<Context>) => {
  try {
    const role = await checkRole(ctx.chat?.id as number);

    if (!role || role === Role.USER) {
      await ctx.reply('Недопустимая команда для вас, диалог завершается');
      return;
    }

    const response = await fetch(`${process.env.domain}/api/v1/user/`, {
      headers: {
        Role: Role.ADMIN,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка выполнения запроса');
    }

    const data = await response.json();

    for (const person of data) {
      await ctx.reply(`
      telegram ID: ${person.telegramID}
      Имя: ${person.name} 
      Рост: ${person.height}
      Вес: ${person.weight}
      Цели: ${person.goals}
      Травмы: ${person.injuries}
      Комментарий: ${person.comment}`);
    }
  } catch {
    await ctx.reply('При получении пользователей произошла ошибка');
  }
};
